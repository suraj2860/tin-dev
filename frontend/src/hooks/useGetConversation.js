import { useEffect, useState } from "react";
import { base_url } from "../constants";

const useGetConversation = () => {

    const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch(base_url + "/api/v1/users");
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data.data);
			} catch (error) {
				console.log(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
}

export default useGetConversation