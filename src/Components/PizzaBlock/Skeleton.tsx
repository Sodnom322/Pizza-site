import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
 
  >
    <circle cx="122" cy="126" r="112" /> 
    <rect x="10" y="250" rx="16" ry="16" width="242" height="23" /> 
    <rect x="7" y="293" rx="14" ry="14" width="248" height="92" /> 
    <rect x="14" y="413" rx="0" ry="0" width="94" height="26" /> 
    <rect x="135" y="402" rx="16" ry="16" width="115" height="39" />
  </ContentLoader>
)

export default Skeleton;
