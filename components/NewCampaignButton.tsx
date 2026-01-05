'use client'

import { FiPlus } from 'react-icons/fi'

export default function NewCampaignButton() {
  const handleClick = () => {
    const modal = document.getElementById('campaign-modal')
    if (modal) {
      modal.classList.remove('hidden')
    }
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-6 py-3 bg-gradient-vibe text-white font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 shadow-xl shadow-purple-500/20"
    >
      <FiPlus className="w-5 h-5" />
      New Campaign
    </button>
  )
}