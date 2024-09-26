export default oauthGitHubEventHandler({
	config: {
		emailRequired: true,
	},
	async onSuccess(event, { user }) {
		await setUserSession(event, {
			user: {
				id: user.id,
			},
			loggedInAt: new Date(),
		})
		return sendRedirect(event, '/')
	},
	onError(event, error) {
		console.error('GitHub OAuth error:', error)
		return sendRedirect(event, '/')
	},
})
