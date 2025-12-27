import React from 'react'

const FeaturesCard = ({ icon, title , description }) => {
  return (
  <div className="bg-[#1b1615] rounded-2xl p-8 flex flex-col items-center text-center gap-4">
    <div className="p-4 bg-primary/20 rounded-xl text-primary">
      {icon}
    </div>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-sm text-base-content/70">
      {description}
    </p>
  </div>
  )
}

export default FeaturesCard