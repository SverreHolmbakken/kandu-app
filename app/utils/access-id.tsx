import { useAuth } from "@clerk/nextjs";

export function useAccessId() {
	const { userId, orgId } = useAuth();
	if (!orgId) {
		return userId;
	} else {
		return orgId;
	}
}
