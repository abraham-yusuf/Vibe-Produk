import React from 'react'

export default async function CampaignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <div>
      <h1>Campaign: {slug}</h1>
      {/* Dynamic content will go here */}
    </div>
  )
}
