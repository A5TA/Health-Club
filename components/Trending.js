import {GiHamburgerMenu} from 'react-icons/gi'

function Trending({ result }) {
  return (
    <div className="hover:bg-[#DFF6FF] hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-between" 
    onClick={() => window.open(`${result.url}`, '_blank')}> 
      <div className="space-y-0.5">
        <h6 className="font-bold max-w-[200px] text-sm">
          {result.title}
        </h6>
        <p className="text-[#6e767d] text-xs font-medium">{result.description}</p>
      </div>

      {result.urlToImage ? (
        <img
          src={result.urlToImage}
          width={70}
          height={70}
          objectfit="cover"
          className="rounded-2xl"
        />
      ) : (
        <div className="icon group">
          <GiHamburgerMenu className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
        </div>
      )}
    </div>
  )
}

export default Trending