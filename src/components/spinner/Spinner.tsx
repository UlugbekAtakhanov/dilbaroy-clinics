import "./spinner.css"

const Spinner = () => {
  return (
    <div className='h-screen flex justify-center mt-[200px]'>
      <div className="half-circle-spinner">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>
    </div>
  )
}

export default Spinner