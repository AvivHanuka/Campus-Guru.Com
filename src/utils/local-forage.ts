import localForage from 'localforage'

const db = localForage.createInstance({
	driver: localForage.INDEXEDDB,
	name: 'campus-guru-db',
	storeName: 'campus-guru',
	size: 5 * 1024 * 1024, // 5.24 MBs
	description: 'Campus Guru DB'
})

export const indexedStorageDB = {
	db,
	getItem: db.getItem,
	setItem: db.setItem,
	removeItem: db.removeItem,
	clear: db.clear
}
