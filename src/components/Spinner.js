


export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center h-screen fixed top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden bg-gray-700 opacity-75">
            <div className="spinner-border animate-spin inline-block w-full h-full absolute border-4 rounded-full" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}