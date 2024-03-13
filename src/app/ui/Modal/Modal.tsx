import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { Dispatch, SetStateAction } from 'react'
import styles from './Modal.module.scss'

export default function Modal(
    {isOpen, setIsOpen, title, children}:
    {isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>,
    title: string, children: React.ReactNode | React.ReactNode[]}) {
    const closeModalHandler = () => {
        setIsOpen(false)
    }
    return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className={styles.Dialog} onClose={closeModalHandler}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={styles.transitionItem} />
          </Transition.Child>

          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={styles.dialogPanel}>
                  <Dialog.Title
                    as="h3"
                    className={styles.dialogTitle}
                  >
                    {title}
                  </Dialog.Title>

                  <div className={styles.controlsWrapper}>
                    {children}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}
