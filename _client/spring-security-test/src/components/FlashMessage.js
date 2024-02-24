import "bootstrap/dist/css/bootstrap.min.css";

function FlashMessage({ message, color, messageHandle }) {

    return (
        <div className={"d-flex flex-row justify-content-between align-items-center py-2 alert alert-" + color} role="alert">
            {message}
            <button 
                type="button"
                className="btn btn-outline-secondary rounded-circle py-0 px-2"
                onClick={messageHandle}
                >&times;</button>
        </div>
    )
}
export default FlashMessage;