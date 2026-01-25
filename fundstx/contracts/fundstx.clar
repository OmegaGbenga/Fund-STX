(use-trait ft-trait .sip-010-trait.sip-010-trait)

;; Error constants
(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-CAMPAIGN-NOT-FOUND (err u101))
(define-constant ERR-GOAL-NOT-MET (err u102))
(define-constant ERR-ALREADY-CLAIMED (err u103))
(define-constant ERR-DEADLINE-PASSED (err u104))
(define-constant ERR-DEADLINE-NOT-PASSED (err u105))
(define-constant ERR-INVALID-AMOUNT (err u106))

;; Data maps
(define-map campaigns
  uint ;; campaign-id
  {
    creator: principal,
    title: (string-utf8 100),
    goal: uint,
    deadline: uint,
    raised: uint,
    claimed: bool,
  }
)

(define-map contributions
  {
    campaign-id: uint,
    contributor: principal,
  }
  uint ;; amount
)

(define-data-var campaign-nonce uint u0)

;; Read-only functions
(define-read-only (get-campaign (id uint))
  (map-get? campaigns id)
)

(define-read-only (get-contribution
    (id uint)
    (participant principal)
  )
  (default-to u0
    (map-get? contributions {
      campaign-id: id,
      contributor: participant,
    })
  )
)

;; Public functions

;; Create a new campaign
(define-public (create-campaign
    (title (string-utf8 100))
    (goal uint)
    (deadline uint)
  )
  (let ((new-id (+ (var-get campaign-nonce) u1)))
    (map-set campaigns new-id {
      creator: tx-sender,
      title: title,
      goal: goal,
      deadline: deadline,
      raised: u0,
      claimed: false,
    })
    (var-set campaign-nonce new-id)
    (ok new-id)
  )
)

;; Contribute to a campaign using USDCx
(define-public (contribute
    (campaign-id uint)
    (amount uint)
    (token <ft-trait>)
  )
  (let (
      (campaign (unwrap! (map-get? campaigns campaign-id) ERR-CAMPAIGN-NOT-FOUND))
      (current-raised (get raised campaign))
      (current-contribution (get-contribution campaign-id tx-sender))
    )
    ;; Check deadline
    (asserts! (< stacks-block-height (get deadline campaign)) ERR-DEADLINE-PASSED)
    (asserts! (> amount u0) ERR-INVALID-AMOUNT)

    ;; Transfer USDCx from sender to contract
    (try! (contract-call? token transfer amount tx-sender (as-contract tx-sender) none))

    ;; Update campaign raised amount
    (map-set campaigns campaign-id
      (merge campaign { raised: (+ current-raised amount) })
    )

    ;; Update contribution map
    (map-set contributions {
      campaign-id: campaign-id,
      contributor: tx-sender,
    }
      (+ current-contribution amount)
    )

    (ok true)
  )
)

;; Claim funds (only creator, only if goal met)
(define-public (claim-funds
    (campaign-id uint)
    (token <ft-trait>)
  )
  (let (
      (campaign (unwrap! (map-get? campaigns campaign-id) ERR-CAMPAIGN-NOT-FOUND))
      (raised (get raised campaign))
    )
    (asserts! (is-eq tx-sender (get creator campaign)) ERR-NOT-AUTHORIZED)
    (asserts! (>= raised (get goal campaign)) ERR-GOAL-NOT-MET)
    (asserts! (not (get claimed campaign)) ERR-ALREADY-CLAIMED)

    ;; Transfer total raised USDCx to creator
    (try! (as-contract (contract-call? token transfer raised tx-sender (get creator campaign) none)))

    ;; Mark as claimed
    (map-set campaigns campaign-id (merge campaign { claimed: true }))

    (ok true)
  )
)

;; Refund (if deadline passed and goal not met)
(define-public (refund
    (campaign-id uint)
    (token <ft-trait>)
  )
  (let (
      (campaign (unwrap! (map-get? campaigns campaign-id) ERR-CAMPAIGN-NOT-FOUND))
      (contribution (get-contribution campaign-id tx-sender))
    )
    (asserts! (> stacks-block-height (get deadline campaign))
      ERR-DEADLINE-NOT-PASSED
    )
    (asserts! (< (get raised campaign) (get goal campaign)) ERR-GOAL-NOT-MET)
    ;; Actually goal met means no refund usually
    (asserts! (> contribution u0) ERR-INVALID-AMOUNT)

    ;; Transfer contribution back to sender
    (try! (as-contract (contract-call? token transfer contribution tx-sender tx-sender none)))

    ;; Reset contribution to 0
    (map-set contributions {
      campaign-id: campaign-id,
      contributor: tx-sender,
    }
      u0
    )

    (ok true)
  )
)
