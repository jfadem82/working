angular.module('project4v2')
	.controller('AlbumsController', AlbumsController)

AlbumsController.$inject = ['albumsFactory', '$window', '$sce']

function AlbumsController (albumsFactory, $window, $sce){
	var vm = this;
	vm.api = albumsFactory
	vm.albums = []
	vm.newAlbum = {}
	vm.api.list()
		.success(function(res){
			vm.albums = res
		})

	vm.addAlbum = function(butt, avatar_url){
			console.log("running addAlbum in controller")
			console.log("butt is " + butt)
			console.log("avatarURL is " + avatar_url)
		var data = {name:butt, avatar_url:avatar_url}

			console.log("data is "  + JSON.stringify(data))
			
		vm.api.addAlbum(data)
			.then(function success(res){
				vm.albums.push(res.data.album)
				vm.newAlbum = {}
			})
	}
	vm.trustSrc = function(src){
		return $sce.trustAsResourceUrl(src);
	}
		vm.uploadFile = function($window){

		function init_upload(){
			console.log("here")
		}
		

	}


	vm.sthree = function(){

		 /*
      		Function to carry out the actual PUT request to S3 using the signed request from the app.
  		*/
		function upload_file(file, signed_request, url){
			console.log(file)
			console.log(signed_request)
			console.log(url)
			$window.localStorage.setItem('url', url)
			var xhr = new XMLHttpRequest();
			xhr.open("PUT", signed_request);
			xhr.setRequestHeader('x-amz-acl', 'public-read');
			xhr.onload = function() {
			  if (xhr.status === 200) {
			      document.getElementById("audio-preview").src = url;            
			      vm.newAlbum.avatar_url = url
			  }
			};
		  xhr.onerror = function() {
		      console.log("vanilla AJax call : " + JSON.stringify(xhr))
		      alert("Could not upload file."); 
		  };
		  xhr.send(file);
		}

		/*
		  Function to get the temporary signed request from the app.
		  If request successful, continue to upload the file using this signed
		  request.
		*/
		function get_signed_request(file){
			console.log("getting signed request")
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "https://revisit-app.herokuapp.com/sign_s3?file_name="+file.name+"&file_type="+file.type);
		xhr.onreadystatechange = function(){
		  if(xhr.readyState === 4){
		    if(xhr.status === 200){
		      var response = JSON.parse(xhr.responseText);
		      upload_file(file, response.signed_request, response.url);
		    }
		    else{
		      alert("Could not get signed URL.");
		    }
		  }
		};
		xhr.send();
		}

		/*
		 Function called when file input updated. If there is a file selected, then
		 start upload procedure by asking for a signed request from the app.
		*/
		function init_upload(){
		console.log("here");
		var files = document.getElementById("file_input").files;
		var file = files[0];
		if(file == null){
		  alert("No file selected.");
		  return;
		}
		get_signed_request(file);
		}

		/*
		 Bind listeners when the page loads.
		*/






		(function() {
		    	window.document.querySelector("#file_input").addEventListener('change', init_upload)
		})();

	}
}

