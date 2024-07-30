#![no_std]

// Energy Commission Certificate to setup a or get meter.

use gmeta::{InOut, Metadata};
use gstd::{debug, errors::Result, msg, prelude::*, MessageId, Ok, Vec};
use users_io::UserAddressId;

pub struct OrgMetadata;

pub type CommonAddressId = MessageId;

pub static mut ORG: Vec<Org> = Vec::new();

impl Metadata for OrgMetadata {
    type Init = ();
    type Handle = InOut<OrgAction, Result<OrgEvent, OrgEventError>>;
    type State = InOut<OrgStateAction, OrgStateEvent>;
    type Reply = ();
    type Others = ();
    type Signal = ();
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum OrgEventError {
    Unauthorized,
    NotFound,
    PaymentRequired,
    IncorrectAmount,
    Unknown(String),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum OrgStateEventError {
    NotFound,
    Unknown(String),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum OrgStateAction {
    GetAllOrg,
    GetOrgById(CommonAddressId),
    GetAllOrgUsernames,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum OrgStateEvent {
    GetAllOrg(Vec<Org>),
    GetOrgById(Option<Org>),
    GetAllOrgUsernames(Vec<String>),
    Error(OrgStateEventError),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct CreateOrgParams {
    owner: UserAddressId,
    created_by: UserAddressId,
    name: String,
    username: String,
    page_type: String,
    category: String,
    readme: Option<String>,
    tags: Vec<String>,
    focused_tags: Vec<String>,
    profile: Option<String>,
    cover: Option<String>,
    socials: Vec<Social>,
    is_premium: bool,
    entry_amount: Option<u64>,
    compare_entry_amount: Option<u64>,
    created_at: String,
    updated_at: String,
    status: Status,
    visibility: Visibility,
    contact_email: Option<String>,
    website: Option<String>,
    page_rules: Option<String>,
    favicon: Option<String>,
    title: Option<String>,
    description: String,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct JoinOrgParams {
    user_id: UserAddressId,
    org_id: CommonAddressId,
    entry_amount: Option<u64>,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct DeleteOrgParams {
    org_id: CommonAddressId,
    owner_id: UserAddressId,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct AddArticleToOrgParams {
    org_id: CommonAddressId,
    owner_id: UserAddressId,
    
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct DeleteArticleFromOrgParams {
    org_id: CommonAddressId,
    owner_id: UserAddressId,

}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct AddPostToOrgParams {
    org_id: CommonAddressId,
    owner_id: UserAddressId,
    post_id: CommonAddressId,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct DeletePostFromOrgParams {
    org_id: CommonAddressId,
    owner_id: UserAddressId,
    post_id: CommonAddressId,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct AddEventToOrgParams {
    org_id: CommonAddressId,
    owner_id: UserAddressId,
    event_id: CommonAddressId,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct DeleteEventFromOrgParams {
    org_id: CommonAddressId,
    owner_id: UserAddressId,
    event_id: CommonAddressId,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct AddUserToOrgParams {
    org_id: CommonAddressId,
    owner_id: UserAddressId,
    user_id: UserAddressId,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct DeleteUserFromOrgParams {
    org_id: CommonAddressId,
    owner_id: UserAddressId,
    user_id: UserAddressId,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum OrgAction {
    Create(CreateOrgParams),
    Join(JoinOrgParams),
    Delete(DeleteOrgParams),
    AddArticle(AddArticleToOrgParams),
    DeleteArticle(DeleteArticleFromOrgParams),
    AddPost(AddPostToOrgParams),
    DeletePost(DeletePostFromOrgParams),
    AddOrgEvent(AddEventToOrgParams),
    DeleteOrgEvent(DeleteEventFromOrgParams),
    AddUser(AddUserToOrgParams),
    DeleteUser(DeleteUserFromOrgParams),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum OrgEvent {
    Created(CommonAddressId),
    Joined(CommonAddressId),
    Deleted(CommonAddressId),
    AddedArticle(CommonAddressId),
    DeletedArticle(CommonAddressId),
    AddedPost(CommonAddressId),
    DeletedPost(CommonAddressId),
    AddedOrgEvent(CommonAddressId),
    DeletedOrgEvent(CommonAddressId),
    AddedUser(CommonAddressId),
    DeletedUser(CommonAddressId),
    Error(OrgEventError),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum Visibility {
    Public,
    Private,
    Restricted,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum Status {
    Active,
    InActive,
    Archived,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct Org {
    pub id: CommonAddressId,
    pub owner: UserAddressId,
    pub created_by: UserAddressId,
    pub name: String,
    pub username: String,
    pub page_type: String,
    pub category: String,
    pub readme: Option<String>,
    pub tags: Vec<String>,
    pub focused_tags: Vec<String>,
    pub profile: Option<String>,
    pub cover: Option<String>,
    pub members: Vec<UserAddressId>,
    pub articles: Vec<CommonAddressId>,
    pub posts: Vec<CommonAddressId>,
    pub events: Vec<CommonAddressId>,
    pub socials: Vec<Social>,
    pub is_premium: bool,
    pub entry_amount: Option<u64>,
    pub compare_entry_amount: Option<u64>,
    pub created_at: String,
    pub updated_at: String,
    pub visibility: Visibility,
    pub status: Status,
    pub contact_email: Option<String>,
    pub website: Option<String>,
    pub admins: Vec<UserAddressId>,
    pub page_rules: Option<String>,
    pub sponsors: Vec<UserAddressId>,
    pub favicon: Option<String>,
    pub title: Option<String>,
    pub description: String,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct Social {
    name: String,
    domain: String,
    icon: String,
    handler: String,
    hide: bool,
    show_on_post: bool,
}

pub async fn create_org(params: CreateOrgParams) -> Result<OrgEvent, OrgEventError> {
    // Helper function to validate non-empty mandatory fields
    fn validate_mandatory_field(field: &str, field_name: &str) -> Result<(), OrgEventError> {
        if field.is_empty() {
            return Err(OrgEventError::Unknown(format!(
                "{} is required",
                field_name
            )));
        }
        Ok(())
    }

    // Helper function to validate non-empty optional fields
    fn validate_optional_field(
        field: &Option<String>,
        field_name: &str,
    ) -> Result<(), OrgEventError> {
        if let Some(ref field_value) = field {
            if field_value.is_empty() {
                return Err(OrgEventError::Unknown(format!(
                    "{} cannot be empty",
                    field_name
                )));
            }
        }
        Ok(())
    }

    // Validate mandatory fields
    validate_mandatory_field(&params.name, "Org name")?;
    validate_mandatory_field(&params.username, "Username")?;
    validate_mandatory_field(&params.description, "Description")?;
    validate_mandatory_field(&params.page_type, "Org type")?;
    validate_mandatory_field(&params.category, "Category")?;
    validate_mandatory_field(&params.created_at, "Created at date")?;
    validate_mandatory_field(&params.updated_at, "Updated at date")?;

    // Validate optional fields
    validate_optional_field(&params.profile, "Profile")?;
    validate_optional_field(&params.cover, "Cover")?;
    validate_optional_field(&params.contact_email, "Contact email")?;
    validate_optional_field(&params.website, "Website")?;
    validate_optional_field(&params.page_rules, "Org rules")?;
    validate_optional_field(&params.readme, "Readme")?;

    let org_id = msg::id();

    // Check for uniqueness of username
    unsafe {
        if ORG.iter().any(|org| org.username == params.username) {
            return Err(OrgEventError::Unknown("Username already exists".into()));
        }
    }

    // Create the org
    let org = Org {
        id: org_id,
        owner: params.owner.clone(),
        created_by: params.created_by.clone(),
        name: params.name.clone(),
        username: params.username.clone(),
        description: params.description.clone(),
        page_type: params.page_type.clone(),
        category: params.category.clone(),
        focused_tags: params.focused_tags.clone(),
        tags: params.tags.clone(),
        profile: params.profile.clone(),
        cover: params.cover.clone(),
        members: Vec::new(),
        articles: Vec::new(),
        posts: Vec::new(),
        events: Vec::new(),
        socials: params.socials,
        is_premium: params.is_premium,
        entry_amount: params.entry_amount,
        admins: Vec::new(),
        contact_email: params.contact_email.clone(),
        created_at: params.created_at,
        updated_at: params.updated_at,
        page_rules: params.page_rules.clone(),
        sponsors: Vec::new(),
        status: params.status,
        visibility: params.visibility,
        website: params.website.clone(),
        readme: params.readme.clone(),
        compare_entry_amount: params.compare_entry_amount.clone(),
        favicon: params.favicon.clone(),
        title: params.title.clone(),
    };

    // Add the org to the list
    unsafe {
        ORG.push(org);
    }

    Ok(OrgEvent::Created(org_id))
}

fn find_org_by_id(org_id: &CommonAddressId) -> Option<&mut Org> {
    unsafe { ORG.iter_mut().find(|org| org.id == *org_id) }
}

pub async fn join_org(params: JoinOrgParams) -> Result<OrgEvent, OrgEventError> {
    if let Some(org) = find_org_by_id(&params.org_id) {
        if let Some(entry_amount) = &params.entry_amount {
            if org.is_premium && &org.entry_amount != &Some(*entry_amount) {
                return Err(OrgEventError::IncorrectAmount);
            }
        }
        org.members.push(params.user_id);
        Ok(OrgEvent::Joined(params.org_id))
    } else {
        Err(OrgEventError::NotFound)
    }
}

pub async fn delete_org(params: DeleteOrgParams) -> Result<OrgEvent, OrgEventError> {
    // Check if the org exists and if the owner matches
    let org = unsafe { ORG.iter().find(|org| org.id == params.org_id) };

    match org {
        Some(org) => {
            if org.owner != params.owner_id {
                return Err(OrgEventError::Unauthorized);
            }
        }
        None => return Err(OrgEventError::NotFound),
    }

    // If the owner matches, proceed to delete the org
    let initial_len = unsafe { ORG.len() };
    unsafe {
        ORG.retain(|org| !(org.owner == params.owner_id && org.id == params.org_id));
    }

    if unsafe { ORG.len() } < initial_len {
        Ok(OrgEvent::Deleted(params.org_id))
    } else {
        Err(OrgEventError::NotFound)
    }
}

pub async fn add_article_to_org(
    params: AddArticleToOrgParams,
) -> Result<OrgEvent, OrgEventError> {
    if let Some(org) = find_org_by_id(&params.org_id) {
        if org.owner == params.owner_id {
            org.articles.push(params.org_id.clone());
            Ok(OrgEvent::AddedArticle(params.org_id))
        } else {
            Err(OrgEventError::Unauthorized)
        }
    } else {
        Err(OrgEventError::NotFound)
    }
}

pub async fn delete_article_from_org(
    params: DeleteArticleFromOrgParams,
) -> Result<OrgEvent, OrgEventError> {
    if let Some(org) = find_org_by_id(&params.org_id) {
        if org.owner == params.owner_id {
            org.articles
                .retain(|article| article != &params.org_id);
            Ok(OrgEvent::DeletedArticle(params.org_id))
        } else {
            Err(OrgEventError::Unauthorized)
        }
    } else {
        Err(OrgEventError::NotFound)
    }
}

pub async fn add_post_to_org(params: AddPostToOrgParams) -> Result<OrgEvent, OrgEventError> {
    if let Some(org) = find_org_by_id(&params.org_id) {
        if org.owner == params.owner_id {
            org.posts.push(params.post_id.clone());
            Ok(OrgEvent::AddedPost(params.post_id))
        } else {
            Err(OrgEventError::Unauthorized)
        }
    } else {
        Err(OrgEventError::NotFound)
    }
}

pub async fn delete_post_from_org(
    params: DeletePostFromOrgParams,
) -> Result<OrgEvent, OrgEventError> {
    if let Some(org) = find_org_by_id(&params.org_id) {
        if org.owner == params.owner_id {
            org.posts.retain(|post| post != &params.post_id);
            Ok(OrgEvent::DeletedPost(params.post_id))
        } else {
            Err(OrgEventError::Unauthorized)
        }
    } else {
        Err(OrgEventError::NotFound)
    }
}

pub async fn add_event_to_org(
    params: AddEventToOrgParams,
) -> Result<OrgEvent, OrgEventError> {
    if let Some(org) = find_org_by_id(&params.org_id) {
        if org.owner == params.owner_id {
            org.events.push(params.event_id.clone());
            Ok(OrgEvent::AddedOrgEvent(params.event_id))
        } else {
            Err(OrgEventError::Unauthorized)
        }
    } else {
        Err(OrgEventError::NotFound)
    }
}

pub async fn delete_event_from_org(
    params: DeleteEventFromOrgParams,
) -> Result<OrgEvent, OrgEventError> {
    if let Some(org) = find_org_by_id(&params.org_id) {
        if org.owner == params.owner_id {
            org.events.retain(|event| event != &params.event_id);
            Ok(OrgEvent::DeletedOrgEvent(params.event_id))
        } else {
            Err(OrgEventError::Unauthorized)
        }
    } else {
        Err(OrgEventError::NotFound)
    }
}

pub async fn add_user_to_org(params: AddUserToOrgParams) -> Result<OrgEvent, OrgEventError> {
    if let Some(org) = find_org_by_id(&params.org_id) {
        if org.owner == params.owner_id {
            org.members.push(params.user_id);
            Ok(OrgEvent::AddedUser(params.org_id))
        } else {
            Err(OrgEventError::Unauthorized)
        }
    } else {
        Err(OrgEventError::NotFound)
    }
}

pub async fn delete_user_from_org(
    params: DeleteUserFromOrgParams,
) -> Result<OrgEvent, OrgEventError> {
    if let Some(org) = find_org_by_id(&params.org_id) {
        if org.owner == params.owner_id {
            org.members.retain(|user| *user != params.user_id);
            Ok(OrgEvent::DeletedUser(params.org_id))
        } else {
            Err(OrgEventError::Unauthorized)
        }
    } else {
        Err(OrgEventError::NotFound)
    }
}

// -------------------------------------------------------

pub fn get_all_orgs() -> OrgStateEvent {
    let pages: Vec<Org> = unsafe { ORG.iter().cloned().collect() };
    OrgStateEvent::GetAllOrg(pages)
}

fn get_org_by_id(org_id: CommonAddressId) -> OrgStateEvent {
    let org = unsafe { ORG.iter().find(|org| org.id == org_id).cloned() };
    match org {
        Some(org) => OrgStateEvent::GetOrgById(Some(org)),
        None => OrgStateEvent::GetOrgById(None),
    }
}

pub fn get_all_org_usernames() -> OrgStateEvent {
    let usernames: Vec<String> =
        unsafe { ORG.iter().map(|org| org.username.clone()).collect() };
    OrgStateEvent::GetAllOrgUsernames(usernames)
}

pub fn handle_org_state(org_state_action: OrgStateAction) -> OrgStateEvent {
    match org_state_action {
        OrgStateAction::GetAllOrg => get_all_orgs(),
        OrgStateAction::GetOrgById(org_id) => get_org_by_id(org_id),
        OrgStateAction::GetAllOrgUsernames => get_all_org_usernames(),
    }
}

pub async fn handle_org_action(org_action: OrgAction) -> Result<OrgEvent, OrgEventError> {
    debug!("org_action: {:?}", org_action);

    match org_action {
        OrgAction::Create(params) => create_org(params).await,
        OrgAction::Join(params) => join_org(params).await,
        OrgAction::Delete(params) => delete_org(params).await,
        OrgAction::AddArticle(params) => add_article_to_org(params).await,
        OrgAction::DeleteArticle(params) => delete_article_from_org(params).await,
        OrgAction::AddPost(params) => add_post_to_org(params).await,
        OrgAction::DeletePost(params) => delete_post_from_org(params).await,
        OrgAction::AddOrgEvent(params) => add_event_to_org(params).await,
        OrgAction::DeleteOrgEvent(params) => delete_event_from_org(params).await,
        OrgAction::AddUser(params) => add_user_to_org(params).await,
        OrgAction::DeleteUser(params) => delete_user_from_org(params).await,
    }
}
