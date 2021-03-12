export const orgUserGroup = {
  header: 'All user groups ({{count}})',
  disabled: '(disabled)',
  uid: 'Code',
  name: 'Name',
  unit: 'Unit',
  orgUnit: 'Unit',
  actions: '',

  byName: 'Sort by name',
  byUnitName: 'Sort by unit',
  byGroupID: 'Sort by group',

  details: {
    title: 'User group Details',
    subtitle: 'User group: {{ item.name }}',
  },

  edit: {
    title: 'Edit User group',
    subtitle: 'User group: {{ item.name }}',
  },

  create: {
    title: 'Create User group',
    subtitle: '',
  },

  links: {
    user: 'Users',
    permission: 'Purchase limits',
  },

  messages: {
    update: 'User Group {{ item.name }} updated successfully',
    create: 'User Group {{ item.name }} created successfully',
    deleteTitle: 'Delete this user group?',
    delete: 'Are you sure you want to delete user group {{ item.name }}?',
    deleteBody:
      'The users in this group are not affected when the user group is deleted.',
    deleted: 'User Group {{ item.name }} deleted successfully',
  },

  breadcrumbs: {
    list: 'All user groups',
    details: '{{name}}',
    users: 'Users',
    permissions: 'Purchase limits',
  },
};

export const orgUserGroupAssignedUsers = {
  title: 'Assigned users',
  subtitle: 'User group: {{ item.name }}',
  assigned: 'User {{item.name}} assigned successfully',
  unassigned: 'User {{item.name}} unassigned successfully',
};

export const orgUserGroupUsers = {
  title: 'Manage users',
  subtitle: 'User group: {{ item.name }}',
  assigned: 'User {{item.name}} assigned successfully',
  unassigned: 'User {{item.name}} unassigned successfully',
  unassignAll: 'Unassign All',
  unassignAllConfirmation: 'All users unassigned successfully',
};
export const orgUserGroupAssignedPermissions = {
  title: 'Assigned purchase limits',
  subtitle: 'Limit: {{ item.name }}',
  assigned: 'Purchase limits {{item.code}} assigned successfully',
  unassigned: 'Purchase limits {{item.code}} unassigned successfully',
};

export const orgUserGroupPermissions = {
  title: 'Manage purchase limits',
  subtitle: 'Limit: {{ item.name }}',
  assigned: 'Purchase limits {{item.code}} assigned successfully',
  unassigned: 'Purchase limits {{item.code}} unassigned successfully',
};
