
$(document).ready(function() {
	initializePage();
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	
	const database = firebase.database();
	const $debate_container = $('#debate_container');


	$('.representative-button').click(() => {
		console.log('hello');
	})


	/* When user clicks, will get the value from the text fields and put in database */
	$('#create').click(() => {

		const name_form = $('#name-form').val();
		const category_form = $('#category-form').val();
		const description_form = $('#description-form').val();
		console.log(name_form, category_form, description_form);

		database.ref('topics/' + name_form).set( {
			category: category_form, topic: name_form, description: description_form
		},
	);

	});

	/* THIS IS FOR LOADING THE DATA FROM FIRE BASE */
	database.ref('topics/').on('value', (snapshot) => {
		const data = snapshot.val();

		const myDebates = Object.keys(data);
		console.log(data);

		let counter = 0;

		$debate_container.html('');

		for (const e of myDebates) {

			const details = data[e];

			category = details.category;
			topic = details.topic;
			description = details.description;

			console.log(category, topic, description);

			const categoryID = 'category' + counter;		
			const topicID = 'topic' + counter;
			const descriptionID = 'description' + counter;
			const showID = 'showDebate' + counter;
			const debateID = 'debateContent' + counter;
			const contentID = 'content' + counter;
			const debateButtonID = 'debateButton' + counter;


			$debate_container.append(
	  		`
			<div class="card-container">
	            <div class="image-container">
	              <i class="material-icons" id="favorite-card">favorite</i>
	            </div>


	            <div class="description-container">
	              <p class="title-rep" id="${categoryID}">${category}</p>
	              <h2 id="${topicID}">${topic}</h2>
	              <p class="contact" id="${descriptionID}">${description}</p>
	            </div>

	            <div class="buttons-container">
	              <button class="representative-button" id="${showID}">Debate <i class="material-icons" id="right-icon">chevron_right</i> </button>
	            </div>
			</div>
	  		`
	     	);

			const categoryListener = '#' + categoryID;
	     	const topicListener = '#' + topicID;
	     	const descriptionListener = '#' + descriptionID;
	     	const showListener = '#' + showID;
	     	const debateListener = '#' + debateID;
	     	const contentListener = '#' + contentID;
	     	const debateButtonListener = '#' + debateButtonID;
	     	


			$('#debate_container').on('click', showListener, function() {
				modal.style.display = "block";

				const categoryModal = $(categoryListener).text();
				const topicModal = $(topicListener).text();
				const descriptionModal = $(descriptionListener).text();
				console.log(topicModal);

				$('.modal-content').html('<div class="modal-container">' + '<div class="title-container">' + '<div class="info-container">' + '<h5>' + categoryModal + '</h5>' +
										 '<h1>' + topicModal + '</h1>' +
										 '<p>' + descriptionModal + '</p>' + '</div>' + '</div>' +
										 '<div class="debateContent" id='+ debateID +'></div>' + '<div class="post-container">' + '<form><input type="text" name="debateBox" id='+ contentID +'></form><button id='+ debateButtonID +' class="postButton">Post</button>' +
										 '<div>' + '</div>');
				

				/* WILL SHOW COMMENTS FROM DATABASE DEPENDING ON TOPIC */
				database.ref('debate/').on('value', (snapshot) => {
					const debateData = snapshot.val();
					const myDebateCommentsArray = debateData[topicModal];
					const debateComments = Object.keys(myDebateCommentsArray);
					console.log(debateComments);

					$(debateListener).html('');


					for (const e of debateComments) {
						console.log(e);
						$(debateListener).append(
					  		`
							<p> ${e} </p>
					  		`
	     				);


					}

					/*	
					console.log(debateData);

					*/

				});
			});

			/* WHEN USER CLICKS SEND IN COMMENT, IT WILL UPLOAD TO DATABASE */

			$('.modal-content').on('click', debateButtonListener, function() {
				const post = $(contentListener).val();
				const topic = $(topicListener).text();

				database.ref('debate/' + topic + '/' + post).set( {
						content: post
					},
				);

			});



			counter = counter + 1;

		}

	});


	

	// Get the modal
	let modal = document.getElementById('myModal');
	let formModal = document.getElementById('formModal');
	let createButton = document.getElementById('create');

	// Get the button that opens the modal

	// Get the <span> element that closes the modal
	let span = document.getElementsByClassName("close")[0];

	// When the user clicks on the button, open the modal 
	$('body').on('click', ('.debate-button'), function() {
		formModal.style.display = "block";
	});
	
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";
	    formModal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal || even.target == formModal) {
	        modal.style.display = "none";
	        formModal.style.display = "none";
	    }
	}

	createButton.onclick = function(event) {
	    formModal.style.display = "none";
	}

	const name_check = $('#name-form').val();
	const category_check = $('#category-form').val();
	const description_check = $('#description-form').val();

	if( name_check == null || category_check == null || description_check == null ) {
		document.getElementById("create").disabled = true;
	}
	






		



}
