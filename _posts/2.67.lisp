#lang racket

(define (make-leaf symbol weight)
	(list 'leaf symbol weight))

(define (make-code-tree left right)
	(list left
		  right
		  (append (symbols left) (symbols right))
		  (+ (weight left) (weight right))))

(define (decode bits tree)
	(define (decode-1 bits current-branch)
		(if (null? bits)
			'()
			(let ((next-branch
				    (choose-branch (car bits) current-branch)))
			    (if (leaf? next-branch)
			    	(cons (symbol-leaf next-branch)
			    		  (decode-1 (car bits) tree))
			    	(decode-1 (car bits) next-branch)))))
	(decode-1 bits tree))

(define (choose-branch bit branch)
	(cond ((= bit 0) (left-branch branch))
		  ((= bit 1) (right-branch branch))
		  (else (error "bad bit -- CHOOSE-BRANCH" bit))))

(define (leaf? object)
	(eq? (car object) 'leaf))

(define (symbols tree)
	(if (leaf? tree)
		(list (symbol-leaf tree))
		(caddr tree)))

(define (symbol-leaf leaf) (cadr leaf))

(define (left-branch tree) (car tree))

(define (right-branch tree) (cadr tree))

(define (weight tree) 
	(if (leaf? tree)
		(weight-leaf tree)
		(cadddr tree)))

(define (weight-leaf leaf) (caddr leaf))

; (define sample-tree
; 	(make-code-tree (make-leaf 'A 4)
; 		            (make-code-tree 
; 		            	(make-leaf 'B 2)
; 			            (make-code-tree (make-leaf 'C 1)
; 				                        (make-leaf 'D 1)))))
; (define tree
; 	(make-code-tree (make-leaf 'A 3) (make-leaf 'D 4)))
; (define s-leaf (make-leaf 'A 3))
; ; (display (car s-leaf))
; (make-code-tree s-leaf s-leaf)

; (define sample-message '(0 1 1 0 0 1 0 1 0 1 1 1 0))

; (display (decode sample-message))
(display '333)