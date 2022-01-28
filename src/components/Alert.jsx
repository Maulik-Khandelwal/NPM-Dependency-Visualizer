function Alert({ message, color }) {
    return (
        <div>
            {message
                ? message === "Loading..." ? <div className={`bg-${color} z-50 rounded-xl mb-4 py-3 px-4 text-xl text-white font-bold`}>{message}</div> : <div className={`bg-${color} z-50 rounded-xl mb-4 py-3 px-4 text-xl text-bgrey font-bold`}>{message}</div>
                : <div></div>
            }
        </div>
    );
}

export default Alert;