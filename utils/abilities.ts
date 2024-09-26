import { defineAbility } from 'nuxt-authorization/utils'

interface User {
	id: string
}

interface Post {
	authorId: string
}

// Both authenticated and guests users can list posts
export const listPosts = defineAbility({ allowGuest: true }, () => true)

// Only authenticated users can create posts
export const createPost = defineAbility(() => true)

// Only the author of a post can edit it
export const editPost = defineAbility((user: User, post: Post) => {
	return user.id === post.authorId
})
