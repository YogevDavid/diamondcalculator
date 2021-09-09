import initMondayClient from 'monday-sdk-js'

/* *********************** */
/* **** Monday Queries *** */
/* *********************** */

/* *********************** */
/* **** Project Report Queries *** */
/* *********************** */

export const getBoardsPR = async (token) => {
    try {
        const mondayClient = initMondayClient()
        mondayClient.setToken(token)

        const query = `query {
        boards (limit: 5000) {
          id
          name
          workspace {
              id
              name
          }
        }
        }`
        const variables = {}

        const response = await mondayClient.api(query, { variables })
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const getBoardPR = async (token, boardId) => {
    try {
        const mondayClient = initMondayClient()
        mondayClient.setToken(token)

        const query = `query {
      boards (ids: ${[boardId]}) {
        id
        name
        workspace {
            id
            name
        }
        items (limit: 200) {
          id
          name
          column_values {
            id
            type
            title
            text
            value            
          }
        }
      }
      }`
        const variables = {}

        const response = await mondayClient.api(query, { variables })
        return response.data
    } catch (err) {
        console.log(err)
    }
}
// Get All boards
export const getBoards = async () => {
    try {
        const mondayClient = initMondayClient()

        const query = `query {
        boards (limit: 200) {
          id
          name
          board_kind
          state
          workspace {
              id
              name
          }
        }
        }`
        const variables = {}

        const response = await mondayClient.api(query, { variables })
        return response
    } catch (err) {
        console.log(err)
    }
}

// Get All boards ID and NAME only
export const getBoardsIdName = async () => {
    try {
        const mondayClient = initMondayClient()

        const query = `query {
        boards (limit:1000) {
          id
          name    
        }
        }`
        const variables = {}

        const response = await mondayClient.api(query, { variables })
        return response
    } catch (err) {
        console.log(err)
    }
}

// Get All boards with ALL the data
export const getBoardsComplete = async () => {
    try {
        const mondayClient = initMondayClient()

        const query = `query {
        boards (limit: 200) {
          id
          name
          board_kind
          state
          updated_at
          subscribers {
            id
            name
            photo_tiny
            url
          }
          workspace {
              id
              name
          }
        }
        }`
        const variables = {}

        const response = await mondayClient.api(query, { variables })
        return response
    } catch (err) {
        console.log(err)
    }
}

// Get Specific boards with ALL the data
export const getBoardsSpecificComplete = async (ids) => {
    try {
        const mondayClient = initMondayClient()

        const query = `query   {
        boards ( ids: ${[ids]}) {
          id
          name
          board_kind
          state
          updated_at
          subscribers {
            id
            name
            photo_tiny
            url
          }
          workspace {
              id
              name
          }
        }
        }`
        const variables = {}

        const response = await mondayClient.api(query, { variables })
        return response
    } catch (err) {
        console.log(err)
    }
}

// Get specific board
export const getBoard = async (boardId) => {
    try {
        const mondayClient = initMondayClient()

        const query = `query  {
        boards (limit: 50, ids: ${[boardId]}) {
          id
          name
          permissions
          board_kind
          description
          state
          board_folder_id
          pos
          subscribers {
            id
            name
            photo_tiny
          }
          groups {
            id
            title
           }
      
          tags {
            id
          }
          owner {
            id
            name
            photo_tiny
          }
          columns {
            id
            title
            type
            archived
            settings_str
          }
      
          items(limit: 300) {
            id
            name
            state
            group {
              id
            }
            
            column_values {
              id
              additional_info
              title
              text
              value
            }
          }
        }
        }`
        const variables = {}

        const response = await mondayClient.api(query, { variables })
        return response
    } catch (err) {
        console.log(err)
    }
}

// Create a new board
export const addBoard = async (
    board_name,
    board_kind,
    workspace_id,
    template_id
) => {
    try {
        const mondayClient = initMondayClient()

        const query = `mutation create_board($board_name: String!, $board_kind:BoardKind!, $workspace_id: Int, $template_id: Int) {
      create_board (board_name: $board_name, board_kind: $board_kind, workspace_id: $workspace_id, template_id: $template_id) {
      id
      name
      }
      }`

        const variables = { board_name, board_kind, workspace_id, template_id }

        const response = await mondayClient.api(query, { variables })
        return response
    } catch (err) {
        console.log(err)
    }
}

// Get All Users
export const getUsers = async () => {
    try {
        const mondayClient = initMondayClient()

        const query = `query {
              users {
                id
                name
                email
                photo_tiny
                photo_small
                url
              }
            }`
        const variables = {}

        const response = await mondayClient.api(query, { variables })
        return response.data.users
    } catch (err) {
        console.log(err)
    }
}
// Get All Teams
export const getTeams = async () => {
    try {
        const mondayClient = initMondayClient()

        const query = `query {
              teams {
                id
                name
              }
            }`
        const variables = {}

        const response = await mondayClient.api(query, { variables })
        return response.data.teams
    } catch (err) {
        console.log(err)
    }
}

// Subscribe users
export const subscribeUsers = async (board_id, user_ids, kind) => {
    try {
        const mondayClient = initMondayClient()

        const query = `mutation add_subscribers_to_board($board_id: Int!, $user_ids:[Int]!, $kind: SubscriberKind) {
          add_subscribers_to_board (board_id: $board_id, user_ids: $user_ids, kind: $kind) {
          id
          
          }
          }`

        const variables = { board_id, user_ids, kind }

        const response = await mondayClient.api(query, { variables })
        return response
    } catch (err) {
        console.log(err)
    }
}

// Get collection of items
export const getItems = async (token, items) => {
    try {
        const mondayClient = initMondayClient()
        mondayClient.setToken(token)

        const query = `query {
      items (ids: [${items}]) {
        id
        name      
        board {
          id
          name
      }
          column_values {
            id
            title
            text
            value            
          }        
      }
      }`
        const variables = {}

        const response = await mondayClient.api(query, { variables })
        return response.data
    } catch (err) {
        console.log(err)
    }
}

// Get "Me"
export const getMe = async () => {
    try {
        const mondayClient = initMondayClient()

        const query = `query {
      me {
        id
        name
        teams {
          id
        }
        is_admin
        is_guest
        photo_tiny
      }
    }`
        const variables = {}

        const response = await mondayClient.api(query, { variables })
        return response.data.me
    } catch (err) {
        console.log(err)
    }
}

// Getting context

export const getContext = async () => {
    const mondayClient = initMondayClient()

    const result = mondayClient.get('context').then((res) => res)

    return result
}

export const getItemUpdates = async (boardId, itemId) => {
    try {
        const mondayClient = initMondayClient()

        const query = `query{
        boards(ids:[${boardId}]) {
          items(ids:[${itemId}]) {
            updates{        
              id
              body
              text_body
              replies {
                id
                body
                text_body
              }
            }
          }
        }
      }`
        const variables = {}

        const response = await mondayClient.api(query, { variables })
        return response
    } catch (err) {
        console.log(err)
    }
}

/* *********************** */
/* ** Monday Mutations *** */
/* *********************** */

// Adding a reply to an update
export const addReplyToUpdate = async (item_id, body, parent_id) => {
    try {
        const mondayClient = initMondayClient()

        const query = `mutation create_update($item_id: Int!, $body:String!, $parent_id: Int) {
        create_update (item_id: $item_id, body: $body, parent_id: $parent_id) {
        id
        }
        }`

        const variables = { item_id, body, parent_id }

        const response = await mondayClient.api(query, { variables })
        return response
    } catch (err) {
        console.log(err)
    }
}

// Add a SubItem
export const addSubItem = async (parent_item_id, item_name, column_values) => {
    try {
        const mondayClient = initMondayClient()

        const query = `
    mutation create_subitem(
      $parent_item_id: Int!
      $item_name: String!
      $column_values: JSON
    ) {
      create_subitem(
        parent_item_id: $parent_item_id
        item_name: $item_name
        column_values: $column_values
      ) {
        id
        board {
          id
        }
      }
    }
  `

        const variables = { parent_item_id, item_name, column_values }

        const response = await mondayClient.api(query, { variables })
        return response
    } catch (err) {
        console.log(err)
    }
}

// Delete a Item/SubItem
export const deleteItem = async (item_id) => {
    try {
        const mondayClient = initMondayClient()

        const query = `
    mutation delete_item(
      $item_id: Int!
    ) {
      delete_item(
        item_id: $item_id
      ) {
        id
      }
    }
  `

        const variables = { item_id }

        const response = await mondayClient.api(query, { variables })
        return response
    } catch (err) {
        console.log(err)
    }
}

// Change Column Item
export const changeColumnItem = async (board_id, item_id, column_id, value) => {
    try {
        const mondayClient = initMondayClient()

        const query = `
    mutation change_column_value(
      $board_id: Int!
      $item_id: Int!
      $column_id: String!
      $value: JSON!
    ) {
      change_column_value(
        board_id: $board_id
        item_id: $item_id
        column_id: $column_id
        value: $value
      ) {
        id
      }
    }
  `

        const variables = {
            board_id,
            item_id,
            column_id,
            value: JSON.stringify(value),
        }

        const response = await mondayClient.api(query, { variables })
        return response
    } catch (err) {
        console.log(err)
    }
}
