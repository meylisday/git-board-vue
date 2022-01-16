<template>
  <div class="cards">
    <div class="comment-body">
      <div class="avatar">
        <ion-avatar>
          <img :src="item?.author?.picture" />
        </ion-avatar>
      </div>
      <div class="comment-detail">
        <div class="comment-header">
          <div class="comment-info">
            <h6 class="author username-color">{{ item?.author?.name }}</h6>
            <span class="comment-date">
              <i class="far fa-clock"></i
              >{{ convertToDate(item.createdAt) }}</span
            >
          </div>
        </div>
        <p class="comment-text">
          <span v-if="!isEditMode">{{ item.text }}</span>
          <textarea v-else v-model="text" />
        </p>
        <div
          class="comment-action"
          v-if="auth?.user?.sub === item.author.user_id"
        >
          <p
            class="edit-comment"
            @click="!isEditMode ? editComment() : saveComment()"
          >
            {{ !isEditMode ? "Edit" : "Save" }}
          </p>
          <p class="delete-comment" @click="deleteComment">
            Delete
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { VueAuth } from "@/auth";
import { defineComponent, inject, ref } from "vue";
import { chatboxEllipsesOutline } from "ionicons/icons";
export default defineComponent({
  props: ["item"],
  components: {},
  setup(props, { emit }) {
    const auth = inject<VueAuth>("auth");
    const text = ref(props.item.text || "");
    const isEditMode = ref(false);

    const convertToDate = (timestamp: any) => {
      const newDate = new Intl.DateTimeFormat("us", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(+timestamp));
      return newDate;
    };

    const editComment = () => {
      isEditMode.value = true;
    };
    const saveComment = () => {
      isEditMode.value = false;

      emit("onEdit", {
        commentId: props.item._id,
        text: text.value,
        createdAt: props.item.createdAt
      });
    };

    const deleteComment = () => {
      emit("onDelete", props.item._id);
    };

    return {
      close,
      chatboxEllipsesOutline,
      editComment,
      saveComment,
      convertToDate,
      deleteComment,
      isEditMode,
      text,
      auth
    };
  }
});
</script>
<style>
.cards {
  margin: 0px auto;
  box-sizing: border-box;
  width: 100%;
}

.comment-body {
  margin-top: 10px;
  font-size: 17px;
  line-height: 1.4;
  padding: 12px 15px;
  display: flex;
  align-items: center;
  width: 100%;
}

.comment-info {
  display: flex;
  justify-content: space-between;
}

.comment-detail {
  padding: 0px 18px;
  width: 100%;
}

.comment-header {
  margin-top: 20px;
  margin-bottom: -13px;
}

.comment-date {
  margin-left: 10px;
}

.comment-date i {
  margin-right: 5px;
}

p.delete-comment,
.edit-comment {
  text-align: end;
  cursor: pointer;
  margin-top: 0;
}

p.delete-comment {
  margin-left: 1rem;
  color: #eb445a;
}

p.edit-comment {
  color: #3880ff;
}

.comment-action {
  display: flex;
  justify-content: end;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}

h6.username-color {
  color: #62487b;
  font-weight: bold;
  margin: 0;
}
.comment-text {
  margin-top: 2rem;
  font-size: 14px;
}
.comment-date {
  font-size: 12px;
  color: #a9a9a9;
}
.comment-text textarea {
  width: 100%;
  border: none;
  outline: none;
  border-bottom: 2px solid #3880ff;
}
</style>
