<template>
  <div class="forms-container">
    <a-form
      class="ant-advanced-search-form"
      layout="horizontal"
      :form="form"
      @submit="handleSubmit"
    >
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="'分类'" :label-col="{span:6}" :wrapperCol="{span:18}">
            <a-row :gutter="24" v-if="stateAddCategory">
              <a-col :span="18">
                <a-select
                  v-decorator="[
                `category`,
                {
                  rules: [
                    {
                      required: true,
                      message: '分类不能为空',
                    },
                  ],
                },
              ]"
                  style="width: 100%"
                  @change="handleCategoryChange"
                  placeholder="选择路由分类"
                >
                  <a-select-opt-group label="静态路由">
                    <!-- <span slot="label">
                  <a-icon type="user" />Manager
                    </span>-->
                    <a-select-option value="1">constant</a-select-option>
                  </a-select-opt-group>
                  <a-select-opt-group label="动态路由">
                    <a-select-option value="2">async</a-select-option>
                  </a-select-opt-group>
                </a-select>
              </a-col>
              <a-col :span="6">
                <a-button icon="plus" @click="stateAddCategory = false"></a-button>
              </a-col>
            </a-row>
            <a-row :gutter="24" v-else>
              <a-col :span="14">
                <a-input
                  v-decorator="[
                `categorytext`,
                {
                  rules: [
                    {
                      required: true,
                      message: '分类不能为空',
                    },
                  ],
                },
              ]"
                  style="width: 100%"
                  placeholder="请填写路由分类"
                ></a-input>
              </a-col>
              <a-col :span="10">
                <a-row :gutter="24">
                  <a-col :span="12">
                    <a-button type="primary" size="small" @click="addCategory">增加</a-button>
                  </a-col>
                  <a-col :span="12">
                    <a-button size="small" @click="stateAddCategory = true">取消</a-button>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="'Path'" :label-col="{span:6}" :wrapperCol="{span:18}">
            <a-input
              v-decorator="[
                `path`,
                {
                  rules: [
                    {
                      required: true,
                      message: 'Path不能为空',
                    },
                  ],
                },
              ]"
              placeholder="填写路由Path，例：‘/home’"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="'Name'" :label-col="{span:6}" :wrapperCol="{span:18}">
            <a-input
              v-decorator="[
                `name`,
                {
                  rules: [
                    {
                      required: true,
                      message: 'Name不能为空',
                    },
                  ],
                },
              ]"
              placeholder="填写路由Name，例：‘Home’"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="'Component'" :label-col="{span:6}" :wrapperCol="{span:18}">
            <a-select
              v-decorator="[
                `component`,
                {
                  rules: [
                    {
                      required: true,
                      message: '组件不能为空',
                    },
                  ],
                },
              ]"
              style="width: 100%"
              @change="handleComponentChange"
              placeholder="选择组件类型"
            >
              <a-select-option value="1">user布局</a-select-option>
              <a-select-option value="2">default布局</a-select-option>
              <a-select-option value="3">业务组件</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="'Redirect'" :label-col="{span:6}" :wrapperCol="{span:18}">
            <a-input placeholder="placeholder" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="'Ipermission'" :label-col="{span:6}" :wrapperCol="{span:18}">
            <a-input placeholder="placeholder" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item :label="'Meta'" :label-col="{span:2}" :wrapperCol="{span:22}">
            <a-select
              mode="tags"
              style="width: 100%"
              @change="handleMetaChange"
              placeholder="输入Meta，回车保存"
            ></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button type="primary" html-type="submit" @click="$emit('handleOk')">保存</a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">取消</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      stateAddCategory: true
    };
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        console.log('error', error);
        console.log('Received values of form: ', values);
      });
    },
    handleReset () {
      this.form.resetFields();
      this.$emit("handleCancel")
    },
    handleMetaChange (value) {
      console.log(`selected Meta ${value}`);
    },
    handleCategoryChange (value) {
      console.log(`selected Category ${value}`);
    },
    handleComponentChange (value) {
      console.log(`selected Component ${value}`);
    },
    addCategory () {
      this.stateAddCategory = false
    }
  },
}
</script>

<style lang="scss" scoped>
.forms-container {
  width: 100%;
  padding: 24px;
  border: 3px dashed #ddd;
  border-radius: 8px;
  margin-bottom: 14px;
}
</style>