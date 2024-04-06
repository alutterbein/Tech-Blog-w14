const newFormHandler = async (event) => {
  event.preventDefault();
// this file is talking to the dashboard.handlebars file!!! 
  const name = document.querySelector('#post-name').value.trim();
  // const needed_funding = document.querySelector('#project-funding').value.trim();
  const post = document.querySelector('#post').value.trim();

  if (name && post) {
    const response = await fetch(`/api/posts`, { //should this instead be postRoutes?
      method: 'POST',
      body: JSON.stringify({ name, post }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dahsboard');
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`, { //should this instead be postRoutes?
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);
