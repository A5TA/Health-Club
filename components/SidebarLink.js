function SidebarLink({Icon, text, active}) {
  return (
    <div className={`text-[#DFF6FF] flex items-center justify-center xl:justify-start
    text-xl gap-x-3 hoverAnimation ${active && 'font-bold'}`}>
        <Icon className='h-6'/>
        <span className="hidden xl:inline">{text}</span>
    </div>
  )
}

export default SidebarLink