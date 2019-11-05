<template>
	<div id="app">
		<div class="bar">
			<span v-if="loading" class="loader">
			<div class="lds-hourglass"></div>
		</span>
			<button v-else @click="getImage">Get image</button>
			<small v-if="noImage && ! loading">The fetched image doesn't exist.</small>
		</div>
		<ul>
			<li v-for="(image, index) in this.images" :key="index">

				<a :href="image" class="link" target="_blank">
					<img :src="image"/>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		name: 'app',
		data() {
			return {
				loading: false,
				images: [],
				noImage: false
			};
		},
		methods: {
			randomize() {
				let result = '',
						characters = 'abcdefghijklmnopqrstuvwxyz0123456789',
						charactersLength = characters.length;
				for ( var i = 0; i < 6; i++ ) {
					result += characters.charAt( Math.floor( Math.random() * charactersLength ) );
				}
				return result;
			},
			maybeAddhttp(url) {
				if ( url.substring( 0, 2 ) === '//' ) {
					return 'http:' + url;
				}
				return url;
			},
			getImage() {
				let self = this;
				self.loading = true;
				self.noImage = false;
				let random = this.randomize();
				axios.get( 'https://cors-anywhere.herokuapp.com/https://prnt.sc/' + random ).
						then( result => {
							let document = new DOMParser().parseFromString( result.data, 'text/html' );
							console.log( document );
							let image = document.querySelector( '.image-container > .screenshot-image' );
							console.log( image );
							if ( image !== null ) {
								image = image.getAttribute( 'src' );
								image = this.maybeAddhttp( image );
								if ( !self.images.includes( image ) && image !== null ) {
									console.log( image );
									self.images.push( image );
								} else {
									self.noImage = true;
								}
							}
						} ).finally( () => {
					setTimeout( () => {
						self.loading = false;
						window.scrollTo( 0, document.body.scrollHeight );
					}, 1000 );

				} );
			}
		}
	};
</script>

<style>
	html {
		background-color: #333;
	}

	* {
		margin: 0;
		padding: 0;
	}

	#app {
	}

	#app, img {
		max-width: 100%;
	}

	img {
		display: block;
		max-width: 100%;
		height: auto;
		margin: 0 auto;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: block;
		flex-direction: column;
		margin: 0 auto 20px;
		border-bottom: 1px solid;
		padding-bottom: 20px;
	}

	.link {
		margin: 10px auto;
		font-family: sans-serif;
		text-align: center;
		display: block;
	}

	.lds-hourglass {
		display: block;
		position: relative;
		width: 64px;
		height: 64px;
	}

	.lds-hourglass:after {
		content: " ";
		display: block;
		border-radius: 50%;
		width: 0;
		height: 0;
		margin: 6px;
		box-sizing: border-box;
		border: 26px solid #bada55;
		border-color: #bada55 transparent #bada55 transparent;
		animation: lds-hourglass 1.2s infinite;
	}

	@keyframes lds-hourglass {
		0% {
			transform: rotate(0);
			animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
		}
		50% {
			transform: rotate(900deg);
			animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
		}
		100% {
			transform: rotate(1800deg);
		}
	}

	.loader {
		display: block;
	}

	.loader > div {
		margin: 0 auto;
	}

	button {
		margin: 0 auto;
		display: block;
		background: #fff;
		box-shadow: none;
		border: none;
		font-weight: 900;
		text-transform: uppercase;
		padding: 5px 20px;
		border-radius: 5px;
		margin: 10px auto;
	}

	small {
		color: #fff;
		margin: 0 auto;
		display: block;
		text-align: center;
	}

	.bar {
		background: rgba(0, 0, 0, 0.6);
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		padding: 10px;
	}

	body {
		margin-top: 70px;
	}
</style>
