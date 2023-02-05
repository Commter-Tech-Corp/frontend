import axios from "axios"
import { useEffect } from "react"
import { getTokenCookie } from "../../utils/utils"

export default function CartPage () {

    useEffect(() => {
        axios.get('https://yurr.app/api/user/card', {
            headers: {
                Authorization: `Bearer ${getTokenCookie()}`
            }
        }).then(res => {
            console.log(res.data)
        });
        
        axios.get('https://yurr.app/api/user/favourite', {
            headers: {
                Authorization: `Bearer ${getTokenCookie()}`
            }
        }).then(res => {
            console.log(res.data)
        });
    }, [])

    return (
        <div>
            <h1>Cart</h1>
        </div>
    )
}