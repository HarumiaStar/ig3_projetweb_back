module.exports = {
	apps : [
		{
			name: "woa-backend",
			script: "./bin/www",
			watch: ["./"],
			env: {
				"PORT": 8000
			}
		}
	]
}
