const newPostFormHandler = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#title-new-post').value.trim();
    const post = document.querySelector('#content-new-post').value.trim();
    if (title && content) {
const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' },

    });


    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
}
  };


  const newPostForm = document.querySelector('.new-post-form');
  if (newPostForm) {
    newPostForm.addEventListener('submit', newPostFormHandler);
  }