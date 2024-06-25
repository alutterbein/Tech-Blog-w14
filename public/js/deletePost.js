const deletePost = async (post_id) => {
    const response = await fetch(`/api/post/${post_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  };

const deletePostHandler = async (event) => {
    if (event.target.hasAttribute('.delete-post')) {
      const id = event.target.getAttribute('data-post-id');
      deletePost(id);
    }
};

document.addEventListener('click', deletePostHandler);



//   const newFormHandler = async (event) => {
//     event.preventDefault();
//     const post = document.querySelector('#post-body').value.trim();
//     const name = document.querySelector('#post-name').value.trim();

//     if (post && name) {
//       const response = await fetch('/api/post', {
//         method: 'POST',
//         body: JSON.stringify({ name, post }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         document.location.replace('/dahsboard');
//       } else {
//         alert('Failed to create post');
//       }
//     }
//   };