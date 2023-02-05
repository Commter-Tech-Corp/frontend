const PageLoader = () => {
    return (
        <div className="fixed flex z-50 left-0 top-0 items-center justify-center h-screen w-full bg-jacarta-800/60">
            <div className="loader animate-heartBeat ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mb-4"></div>
        </div>
    )
}

export default PageLoader