import notFound from "/notFound.gif";
const NotFound = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-black">
            <img className="h-[50%] object-cover" src={notFound} alt="" />
        </div>
    )
}

export default NotFound;