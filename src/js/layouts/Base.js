import React from 'react';
import Navbar from '../../components/Navbar';

export default function BaseLayout({children, ...props}) {
  return (
    <div>
      <Navbar {...props}/>
      {children}
    </div>
  )
}

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component'
}



export const withBaseLayout = (Component, config) => props =>{
  // const name = Component.name
  const viewName = getDisplayName(Component)
    return(
      <>
        <Navbar {...config} view={viewName} />
        <Component {...props}/>
      </>
    ) 
  }

