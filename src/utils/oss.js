let OSS = require('ali-oss')
let client = new OSS({
	region: 'oss-cn-beijing',
	accessKeyId: 'LTAI4FpPenCf8sMSAyZyHRr1',
	accessKeySecret: '6s4IhGogiEzf9Y73R2DqZzx2ZgA53L',
	bucket: 'ai-mark'
})

export function upload(fileList, path, callback) {
	fileList.forEach(async file => {
		try {
			let result = await client.put(path + file.name, file)
			callback(file)
		} catch (e) {
			console.log(e)
		}
	})
}

export async function getImages(dir) {
	try {
		let result = await client.list({
			prefix: dir,
			delimiter: '/'
		})
		return result.objects.map(item => {
			return { name: item.name, url: item.url }
		})
	} catch (e) {
		return []
	}
}
export async function getDir(dir) {
	try {
		let result = await client.list({
			prefix: dir,
			delimiter: '/'
		})
		return result.prefixes.map(item => {
			return { dir: item.split('/')[1] }
		})
	} catch (e) {
		return []
	}
}

export async function deletefiles(files, callback) {
	try {
		let result = await client.deleteMulti(files)
		callback(result)
	} catch (e) {
		console.log(e)
	}
}
