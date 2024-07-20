'use client'

import React, { useEffect, useState } from 'react'
import { Avatar, Input, Tooltip } from '@nextui-org/react'

export default function MessageBox() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    // scroll bottom message area
    const msgArea = document.getElementById('msg-area')
    if (msgArea) msgArea.scrollTop = msgArea.scrollHeight
  }, [])

  const sendMessage = () => {
    if (message.length > 0) {
      setMessage('')
    }
  }

  return (
    <div className="flex flex-col gap-4 justify-between">
      <div className="flex flex-col gap-4 h-96 overflow-scroll" id="msg-area">
        {[...Array(20).keys()].map((x, key) => {
          return (
            <div key={key} className="flex flex-col gap-1">
              <div
                className={
                  'flex gap-3 items-end ' +
                  (key % 2 === 0 ? 'place-self-start' : 'place-self-end')
                }
              >
                <Avatar
                  className="w-6 h-6 text-tiny"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                />
                <div className="max-w-md">
                  <Tooltip
                    size="sm"
                    placement={key % 2 === 0 ? 'right' : 'left'}
                    content="Jeudi, 14 Avril 2024, 13:14h"
                  >
                    <p className="text p-2 bg-gray-100 rounded-md">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and Lorem Ipsum is simply
                      dummy text of the printing and typesetting industry. Lorem
                      Ipsum has been the industry standard dummy text ever since
                      the 1500s, when an unknown printer took a galley of type
                      and Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and
                    </p>
                  </Tooltip>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Input
        radius="none"
        type="text"
        placeholder="Tapez votre message..."
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') sendMessage()
        }}
      />
    </div>
  )
}
