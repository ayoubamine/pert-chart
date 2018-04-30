<template>
	<div class="home">
		<div class="uk-section-xsmall uk-section-primary">
			<div class="uk-container uk-container-large">
				<p uk-margin>			
          <a class="uk-float-right color-white cursor-pointer margin-top" 
            uk-tooltip="title: About; pos: bottom" 
            uk-icon="icon: happy; ratio: 1.3"
            uk-toggle="target: #about"></a>
					
					<button class="uk-button uk-button-default">
						<span class="uk-margin-small-right" uk-icon="download"></span>Open</button>
					
          <button class="uk-button uk-button-default" uk-toggle="target: #save-data">
						<span class="uk-margin-small-right" uk-icon="upload"></span>Save</button>
					
          <button class="uk-button uk-button-default" uk-toggle="target: #general-settings">
						<span class="uk-margin-small-right" uk-icon="settings"></span>Settings</button>
					
          <router-link :to="{ name: 'pert', params: { tasks: tasks } }" href="/pert" class="uk-button uk-button-primary">
            <span class="uk-margin-small-right" uk-icon="git-branch"></span>Pert</router-link>
				</p>
			</div>
		</div>

		<div id="data-table" class="uk-section-xsmall data-table">
			<div class="uk-container uk-container-large">
				<table class="uk-table uk-table-divider">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Duration</th>
              <th>DependsOn</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in tasks" :key="index" :class="{ 'selected-row': selectedRow == index }" class="task-row">
              <td>{{ task.id }}</td>
              <td>{{ task.name }}</td>
              <td>{{ task.duration }}</td>
              <td>{{ dependsOn(task.dependsOn) }}</td>
              <td>
                <ul class="uk-iconnav">
                  <li><span @click="updateTask(index)" class="cursor-pointer" uk-icon="file-edit" uk-tooltip="Edit"></span></li>
                  <li><span @click="deleteTask(index)" class="cursor-pointer" uk-icon="trash" uk-tooltip="Delete"></span></li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div v-if="selectedRow == -1" class="uk-inline uk-width-1-1">
                  <a @click="taskId = ''" class="uk-form-icon uk-form-icon-flip" uk-icon="close" uk-tooltip="Clear"></a>
                  <input @keyup.enter="addTask" v-model.trim="taskId" class="uk-input" type="text" placeholder="Task id">
                </div>
                <span v-else 
                  @click="cancelUpdate()" 
                  class="cursor-pointer margin-top" 
                  uk-icon="close" 
                  uk-tooltip="Cancel update">
                </span>
              </td>
              <td>
                <div class="uk-inline uk-width-1-1">
                  <a @click="taskName = ''" class="uk-form-icon uk-form-icon-flip" uk-icon="close" uk-tooltip="Clear"></a>
                  <input @keyup.enter="addTask" v-model.trim="taskName" class="uk-input" type="text" placeholder="Task name">
                </div>
              </td>
              <td>
                <div class="uk-inline uk-width-1-1">
                  <a @click="taskDuration = ''" class="uk-form-icon uk-form-icon-flip" uk-icon="close" uk-tooltip="Clear"></a>
                  <input @keyup.enter="addTask" v-model.trim="taskDuration" class="uk-input" type="text" placeholder="Task duration">
                </div>                
              </td>
              <td>
                <div class="uk-inline uk-width-1-1">
                  <a @click="taskDependsOn = ''" class="uk-form-icon uk-form-icon-flip" uk-icon="close" uk-tooltip="Clear"></a>
                  <input @keyup.enter="addTask" v-model.trim="taskDependsOn" class="uk-input" type="text" placeholder="1, 2, 3">
                </div>
              </td>
            </tr>
          </tbody>
				</table>
			</div>
		</div>

    <!-- Save Data modal -->
    <div id="save-data" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <form class="uk-form-stacked">
          <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text">Filename</label>
            <div class="uk-form-controls">
              <input v-model="fileName" class="uk-input" id="form-stacked-text" type="text" placeholder="Filename">
            </div>
          </div>

          <div class="uk-margin">
            <label><input v-model="fileNameFormated" class="uk-checkbox" type="checkbox" checked> Concatenate with current date</label>
          </div>
        </form>
        <p class="uk-text-right">
          <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
          <button @click="save" class="uk-button uk-button-primary" type="button">Save</button>
        </p>
      </div>
    </div>

    <!-- Settings modal -->
    <div id="general-settings" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <p>Node background color:</p>
        <compact-picker class="colors" v-model="settings.nodebag"/>
        <p>Node border color:</p>
        <compact-picker class="colors" v-model="settings.nodesBorderColor"/>
        <p class="uk-text-right">
          <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
          <button class="uk-button uk-button-primary" type="button">Save</button>
        </p>
      </div>
    </div>

        <!-- About modal -->
    <div id="about" uk-modal>
      <div class="uk-modal-dialog">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="uk-modal-header">
          <h2 class="uk-modal-title">About</h2>
        </div>
        <div class="uk-modal-body">
          <p>Pert-Chart is free and open source software created by Ayoub AMINE</p>
          <p>E-mail: programmer010011@gmail.com</p>
          <p>The Pert-Chart code is released under GNU GPLv3.</p>
        </div>
        <div class="uk-modal-footer uk-text-right">
          <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import { Compact } from "vue-color";

export default {
  name: "home",
  components: {
    "compact-picker": Compact
  },
  data() {
    return {
      settings: {
        nodebag: "#333",
        nodesBorderColor: "#333"
      },
      tasks: [
        { id: "A", name: "Task A", duration: 4 },
        { id: "B", name: "Task B", duration: 1, dependsOn: ["A"] },
        { id: "C", name: "Task C", duration: 2, dependsOn: ["B"] },
        { id: "D", name: "Task D", duration: 1, dependsOn: ["C"] },
        { id: "E", name: "Task E", duration: 4, dependsOn: ["D"] },
        { id: "F", name: "Task F", duration: 3, dependsOn: ["E"] },
        { id: "G", name: "Task G", duration: 4, dependsOn: ["E"] },
        { id: "H", name: "Task H", duration: 2, dependsOn: ["F", "G"] },
        { id: "I", name: "Task I", duration: 2, dependsOn: ["D"] },
        { id: "J", name: "Task J", duration: 2, dependsOn: ["I"] },
        { id: "K", name: "Task K", duration: 5, dependsOn: ["D"] },
        { id: "L", name: "Task L", duration: 1, dependsOn: ["H", "J"] },
        { id: "M", name: "Task M", duration: 1, dependsOn: ["K", "L"] }
      ],
      taskName: "",
      taskDuration: "",
      taskDependsOn: "",
      taskId: "",
      selectedRow: -1,
      fileName: "",
      fileNameFormated: true
    };
  },
  methods: {
    dependsOn(dependsOn) {
      if (dependsOn) return dependsOn.join(", ");
      else return "/";
    },
    addTask() {
      const ids = this.taskDependsOn.length 
                  ? this.taskDependsOn.split(",").map(task => task.trim().toUpperCase())
                  : undefined;
      const duration = Number(this.taskDuration);
      this.taskId = this.taskId.toUpperCase();

      if (
        !this.taskId.length ||
        isNaN(duration) ||
        duration <= 0
      ) {
        return UIkit.notification({
          message: "Task not valid",
          status: "danger"
        });
      }

      if (this.selectedRow == -1) {
        this.tasks.push({
          id: this.taskId,
          name: this.taskName || "Task " + this.taskId,
          duration: this.taskDuration,
          dependsOn: ids
        });
      } else {
        this.tasks[this.selectedRow].id = this.taskId;
        this.tasks[this.selectedRow].name =
          this.taskName || "Task " + this.taskId;
        this.tasks[this.selectedRow].duration = this.taskDuration;
        this.tasks[this.selectedRow].dependsOn = ids;
        this.selectedRow = -1;
      }

      this.resetForm();

      this.$nextTick(() => {
        var objDiv = document.getElementById("data-table");
        objDiv.scrollTop = objDiv.scrollHeight;
      });
    },
    updateTask(index) {
      this.selectedRow = index;
      this.taskId = this.tasks[index].id;
      this.taskName = this.tasks[index].name;
      this.taskDuration = this.tasks[index].duration;
      this.taskDependsOn = this.tasks[index].dependsOn
        ? this.tasks[index].dependsOn.join(", ")
        : [];
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    cancelUpdate() {
      this.selectedRow = -1;
      this.resetForm();
    },
    resetForm() {
      this.taskId = "";
      this.taskName = "";
      this.taskDuration = "";
      this.taskDependsOn = "";
    },
    save() {}
  }
};
</script>

<style scoped>
.color-white {
  color: white !important;
}

.cursor-pointer {
  cursor: pointer;
}

.selected-row {
  background-color: rgb(248, 248, 248);
}

.task-row:hover {
  background-color: rgb(248, 248, 248);
}

.margin-top {
  margin-top: 10px;
}

.data-table {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 80px;
  overflow: auto;
}

.colors {
  margin: auto;
}
</style>
