export default function fetch(url, params) {
	return {
		mock: result => {
			return new Promise((res, rej) => {
				setTimeout(() => {
					if (result && result.name === 'error') {
						rej();
					}
					res({
						json: () => result
					});
				}, 1);
			});
		}
	};
}