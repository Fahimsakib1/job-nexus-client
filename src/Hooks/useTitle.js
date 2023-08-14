import { useEffect } from "react";

const useTitle = (title) => {
    useEffect( () => {
        document.title = `${title} - Job Portal`;
    }, [title])
}
export default useTitle;