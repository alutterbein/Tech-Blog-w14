const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];

const updatePostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document
    .querySelector('#content-update-post')
.value.trim();

    if (title && content) {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

const updatePostbtn = document.querySelector('#update-post-btn');

if (updatePostbtn) {
    updatePostbtn.addEventListener('click', updatePostFormHandler);
}
