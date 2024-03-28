const { mongoose } = require("mongoose");

const TasksSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Enter title"],
    },

    body: {
      type: String,
      required: [true, "Enter a task"],
    },

    tags: {
      type: String,
      index: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tasks = mongoose.model("Tasks", TasksSchema);

module.exports = Tasks;
