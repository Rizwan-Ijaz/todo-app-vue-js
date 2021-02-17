export default {
    methods: {
        submitForm() {
            this.$refs.modalTaskName.$refs.name.validate();
            if (!this.$refs.modalTaskName.$refs.name.hasError) {
                this.submitTask();
            }
        }
    },
    components: {
        "modal-header": require("components/Tasks/Modals/Shared/ModalHeader")
            .default,
        "modal-task-name": require("components/Tasks/Modals/Shared/ModalTaskName")
            .default,
        "modal-task-duedate": require("components/Tasks/Modals/Shared/ModalDueDate")
            .default,
        "modal-task-duetime": require("components/Tasks/Modals/Shared/ModalDueTime")
            .default,
        "modal-task-buttons": require("components/Tasks/Modals/Shared/ModalButtons")
            .default,
    },
}