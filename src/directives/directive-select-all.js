export const selectAll = {
    bind(el) {
        const input = el.querySelector(".q-field__native");
        input.addEventListener("focus", () => {
            console.log("focused");
            if (input.value.length) {
                input.select();
            }
        });
    }
}