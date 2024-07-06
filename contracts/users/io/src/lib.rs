#![no_std]

pub struct DeConnectUsersMetadata;

use gmeta::{InOut, Metadata};
use gstd::{prelude::*, ActorId, Vec};

pub static mut USERS: Vec<User> = Vec::new();


pub type UserAddressId = ActorId;

impl Metadata for DeConnectUsersMetadata {
    type Init = ();
    type Handle = InOut<UserAction, UserEvent>;
    type State = InOut<UserStateQuery, UserStateEvent>;
    type Reply = ();
    type Others = ();
    type Signal = ();
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum UserError {
    RegistrationFailed(String),
    Failed(String),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum UserActionError {
    UserNotFound,
    UserDoNotExist,
    UserHasNoAccountAssociation,
}

pub type UserId = ActorId;

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
/// Represents a user in the system.
pub struct User {
    pub id: UserId,
    pub name: Option<String>,
    pub username: Option<String>,
    pub is_deactivate: bool,
    pub provider: Option<String>,
    pub email: Option<String>,
    pub bio: Option<String>,
    pub profile_picture_url: Option<String>,
    pub created_at: String,
    pub last_updated: String, // This isa DateTime type from Javascript - ISO format
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
/// Represents actions that can be performed by or on a user.
pub enum UserAction {
    Register(UserRegisterParams),
    Update(UserUpdateParams),
    Delete { id: UserId },
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
/// Represents events related to users.
pub enum UserEvent {
    Registered { id: Option<UserId> },
    Updated { id: Option<UserId> },
    Deleted { id: Option<UserId> },
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
/// Represents social media handles of an author.
pub struct SocialMediaHandles {
    /// The author's Twitter handle.
    pub twitter: Option<String>,

    /// The author's LinkedIn profile URL.
    pub linkedin: Option<String>,

    /// The author's GitHub profile URL.
    pub github: Option<String>,

    /// Other social media links.
    pub other: Vec<String>,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
/// Represents social media handles of an author.
pub enum UserStateQuery {
    AllUsers,
    FindUserByActorId { user_id: UserId },
}
#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
/// Represents social media handles of an author.
pub enum UserStateEvent {
    AllUsers(Vec<User>),
    FindUserByActorId(Option<User>),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
// Define a struct for user registration parameters
pub struct UserRegisterParams {
    id: UserId,
    username: Option<String>,
    email: Option<String>,
    bio: Option<String>,
    profile_picture_url: Option<String>,
    name: Option<String>,
    created_at: String,
    last_updated: String,
    provider: Option<String>,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
// Define a struct for user update parameters
pub struct UserUpdateParams {
    id: UserId,
    username: Option<String>,
    email: Option<String>,
    bio: Option<String>,
    profile_picture_url: Option<String>,
    name: Option<String>,
    last_updated: String,
}

// Separate handle functions for different user actions
pub fn handle_register(params: UserRegisterParams) -> UserEvent {
    let UserRegisterParams {
        id,
        username,
        email,
        bio,
        profile_picture_url,
        name,
        created_at,
        last_updated,
        provider,
    } = params;

    // Check if a user with the same ID already exists
    let user_exists = unsafe { USERS.iter().any(|user| user.id == id) };
    // String::from("Registration failed. User already exist.")

    if user_exists {
        // User with the same ID already exists
        return UserEvent::Registered { id: None };
    }

    // Logic for registering a new user
    let new_user = User {
        id,
        username,
        email,
        bio,
        profile_picture_url,
        created_at,
        last_updated,
        name,
        is_deactivate: false,
        provider,
    };
    unsafe {
        USERS.push(new_user);
    }
    return UserEvent::Registered { id: Some(id) };
}

pub fn handle_update(params: UserUpdateParams) -> UserEvent {
    let UserUpdateParams {
        id,
        username,
        email,
        bio,
        profile_picture_url,
        name,
        last_updated,
    } = params;

    // Check if a user with the same ID already exists
    let user_exists = unsafe { USERS.iter().any(|user| user.id == id) };

    if user_exists == false {
        // User with the same ID already exists
        // String::from("Registration failed. User already exist.",)
        return UserEvent::Updated { id: None };
    }

    // Logic for updating an existing user
    if let Some(user) = find_user_by_actor_id(&id) {
        if let Some(new_username) = username {
            user.username = Some(new_username);
        }
        if let Some(name) = name {
            user.name = Some(name);
        }
        if let Some(new_email) = email {
            user.email = Some(new_email);
        }
        if let Some(new_bio) = bio {
            user.bio = Some(new_bio);
        }
        if let Some(new_profile_picture_url) = profile_picture_url {
            user.profile_picture_url = Some(new_profile_picture_url);
        }
        user.last_updated = last_updated;
        return UserEvent::Updated { id: Some(id) };
    } else {
        return UserEvent::Updated { id: None };
    }
}

pub fn handle_delete(id: UserId) -> UserEvent {
    unsafe {
        if let Some(index) = find_user_index_by_actor_id(id) {
            USERS.remove(index);
            return UserEvent::Deleted { id: Some(id) };
        } else {
            return UserEvent::Updated { id: None };
        }
    }
}

// Main handle function
pub fn handle_user_action(user_action: UserAction) -> UserEvent {
    match user_action {
        UserAction::Register(params) => handle_register(params),
        UserAction::Update(params) => handle_update(params),
        UserAction::Delete { id } => handle_delete(id),
    }
}

pub fn get_all_users() -> UserStateEvent {
    let users: Vec<User> = unsafe { USERS.iter().filter_map(|user| Some(user.clone())).collect() };
    return UserStateEvent::AllUsers(users);
}

pub fn get_user_id(user_id: ActorId) -> UserStateEvent {
    let user_option = find_user_by_actor_id(&user_id);
    return UserStateEvent::FindUserByActorId(user_option.cloned());
}

pub fn handle_user_state_query(query: UserStateQuery) -> UserStateEvent {
    match query {
        UserStateQuery::AllUsers => get_all_users(),
        UserStateQuery::FindUserByActorId { user_id } => get_user_id(user_id),
    }
}

/// Finds a user by user_id and returns a mutable reference if found.
fn find_user_by_actor_id(user_id: &ActorId) -> Option<&mut User> {
    unsafe {
        // Access the USERS vector using iter_mut() and find the user by user_id
        USERS.iter_mut().find(|user| user.id == *user_id)
    }
}
/// Finds the index of a user by user_id.
fn find_user_index_by_actor_id(user_id: ActorId) -> Option<usize> {
    unsafe {
        USERS
            .iter()
            .position(|user_option| user_option.id == user_id)
    }
}
