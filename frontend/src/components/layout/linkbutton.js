import styles from "./linkbutton.module.css"

function LinkButton({ url, text }) {
    function handleClick() {
        window.location.href = `http://localhost:3000/${url}`
    }

    return (
        <button className={styles.Button} onClick={handleClick}>
            {text}
        </button>
    )
}

export default LinkButton