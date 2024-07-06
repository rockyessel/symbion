#![no_std]

// Energy Commission Certificate to setup a or get meter.

use deconnect_users_io::UserAddressId;
use gmeta::{InOut, Metadata};
use gstd::{debug, errors::Result, msg, prelude::*, MessageId, Ok, Vec};

pub struct DeConnectPagesMetadata;

pub type CommonAddressId = MessageId;

pub static mut PAGES: Vec<Page> = Vec::new();

impl Metadata for DeConnectPagesMetadata {
    type Init = ();
    type Handle = InOut<PageAction, Result<PageEvent, PageEventError>>;
    type State = InOut<PageStateAction, PageStateEvent>;
    type Reply = ();
    type Others = ();
    type Signal = ();
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum PageEventError {
    Unauthorized,
    NotFound,
    PaymentRequired,
    IncorrectAmount,
    Unknown(String),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum PageStateEventError {
    NotFound,
    Unknown(String),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum PageStateAction {
    GetAllPages,
    GetPageById(CommonAddressId),
    GetAllPageUsernames,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum PageStateEvent {
    GetAllPages(Vec<Page>),
    GetPageById(Option<Page>),
    GetAllPageUsernames(Vec<String>),
    Error(PageStateEventError),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct PageCreateParams {
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
    status: PageStatus,
    visibility: PageVisibility,
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
pub struct PageJoinParams {
    user_id: UserAddressId,
    page_id: CommonAddressId,
    entry_amount: Option<u64>,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct PageDeleteParams {
    page_id: CommonAddressId,
    owner_id: UserAddressId,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct PageAddArticleParams {
    page_id: CommonAddressId,
    owner_id: UserAddressId,
    article_id: CommonAddressId,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct PageDeleteArticleParams {
    page_id: CommonAddressId,
    owner_id: UserAddressId,
    article_id: CommonAddressId,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct PageAddPostParams {
    page_id: CommonAddressId,
    owner_id: UserAddressId,
    post_id: CommonAddressId,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct PageDeletePostParams {
    page_id: CommonAddressId,
    owner_id: UserAddressId,
    post_id: CommonAddressId,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct PageAddPageEventParams {
    page_id: CommonAddressId,
    owner_id: UserAddressId,
    event_id: CommonAddressId,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct PageDeletePageEventParams {
    page_id: CommonAddressId,
    owner_id: UserAddressId,
    event_id: CommonAddressId,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct PageAddUserParams {
    page_id: CommonAddressId,
    owner_id: UserAddressId,
    user_id: UserAddressId,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct PageDeleteUserParams {
    page_id: CommonAddressId,
    owner_id: UserAddressId,
    user_id: UserAddressId,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum PageAction {
    Create(PageCreateParams),
    Join(PageJoinParams),
    Delete(PageDeleteParams),
    AddArticle(PageAddArticleParams),
    DeleteArticle(PageDeleteArticleParams),
    AddPost(PageAddPostParams),
    DeletePost(PageDeletePostParams),
    AddPageEvent(PageAddPageEventParams),
    DeletePageEvent(PageDeletePageEventParams),
    AddUser(PageAddUserParams),
    DeleteUser(PageDeleteUserParams),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum PageEvent {
    Created(CommonAddressId),
    Joined(CommonAddressId),
    Deleted(CommonAddressId),
    AddedArticle(CommonAddressId),
    DeletedArticle(CommonAddressId),
    AddedPost(CommonAddressId),
    DeletedPost(CommonAddressId),
    AddedPageEvent(CommonAddressId),
    DeletedPageEvent(CommonAddressId),
    AddedUser(CommonAddressId),
    DeletedUser(CommonAddressId),
    Error(PageEventError),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum PageVisibility {
    Public,
    Private,
    Restricted,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum PageStatus {
    Active,
    InActive,
    Archived,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct Page {
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
    pub visibility: PageVisibility,
    pub status: PageStatus,
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

pub async fn create_page(params: PageCreateParams) -> Result<PageEvent, PageEventError> {
    // Helper function to validate non-empty mandatory fields
    fn validate_mandatory_field(field: &str, field_name: &str) -> Result<(), PageEventError> {
        if field.is_empty() {
            return Err(PageEventError::Unknown(format!(
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
    ) -> Result<(), PageEventError> {
        if let Some(ref field_value) = field {
            if field_value.is_empty() {
                return Err(PageEventError::Unknown(format!(
                    "{} cannot be empty",
                    field_name
                )));
            }
        }
        Ok(())
    }

    // Validate mandatory fields
    validate_mandatory_field(&params.name, "Page name")?;
    validate_mandatory_field(&params.username, "Username")?;
    validate_mandatory_field(&params.description, "Description")?;
    validate_mandatory_field(&params.page_type, "Page type")?;
    validate_mandatory_field(&params.category, "Category")?;
    validate_mandatory_field(&params.created_at, "Created at date")?;
    validate_mandatory_field(&params.updated_at, "Updated at date")?;

    // Validate optional fields
    validate_optional_field(&params.profile, "Profile")?;
    validate_optional_field(&params.cover, "Cover")?;
    validate_optional_field(&params.contact_email, "Contact email")?;
    validate_optional_field(&params.website, "Website")?;
    validate_optional_field(&params.page_rules, "Page rules")?;
    validate_optional_field(&params.readme, "Readme")?;

    let page_id = msg::id();

    // Check for uniqueness of username
    unsafe {
        if PAGES.iter().any(|page| page.username == params.username) {
            return Err(PageEventError::Unknown("Username already exists".into()));
        }
    }

    // Create the page
    let page = Page {
        id: page_id,
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

    // Add the page to the list
    unsafe {
        PAGES.push(page);
    }

    Ok(PageEvent::Created(page_id))
}

fn find_page_by_id(page_id: &CommonAddressId) -> Option<&mut Page> {
    unsafe { PAGES.iter_mut().find(|page| page.id == *page_id) }
}

pub async fn join_page(params: PageJoinParams) -> Result<PageEvent, PageEventError> {
    if let Some(page) = find_page_by_id(&params.page_id) {
        if let Some(entry_amount) = &params.entry_amount {
            if page.is_premium && &page.entry_amount != &Some(*entry_amount) {
                return Err(PageEventError::IncorrectAmount);
            }
        }
        page.members.push(params.user_id);
        Ok(PageEvent::Joined(params.page_id))
    } else {
        Err(PageEventError::NotFound)
    }
}

pub async fn delete_page(params: PageDeleteParams) -> Result<PageEvent, PageEventError> {
    // Check if the page exists and if the owner matches
    let page = unsafe { PAGES.iter().find(|page| page.id == params.page_id) };

    match page {
        Some(page) => {
            if page.owner != params.owner_id {
                return Err(PageEventError::Unauthorized);
            }
        }
        None => return Err(PageEventError::NotFound),
    }

    // If the owner matches, proceed to delete the page
    let initial_len = unsafe { PAGES.len() };
    unsafe {
        PAGES.retain(|page| !(page.owner == params.owner_id && page.id == params.page_id));
    }

    if unsafe { PAGES.len() } < initial_len {
        Ok(PageEvent::Deleted(params.page_id))
    } else {
        Err(PageEventError::NotFound)
    }
}

pub async fn add_article_to_page(
    params: PageAddArticleParams,
) -> Result<PageEvent, PageEventError> {
    if let Some(page) = find_page_by_id(&params.page_id) {
        if page.owner == params.owner_id {
            page.articles.push(params.article_id.clone());
            Ok(PageEvent::AddedArticle(params.article_id))
        } else {
            Err(PageEventError::Unauthorized)
        }
    } else {
        Err(PageEventError::NotFound)
    }
}

pub async fn delete_article_from_page(
    params: PageDeleteArticleParams,
) -> Result<PageEvent, PageEventError> {
    if let Some(page) = find_page_by_id(&params.page_id) {
        if page.owner == params.owner_id {
            page.articles
                .retain(|article| article != &params.article_id);
            Ok(PageEvent::DeletedArticle(params.article_id))
        } else {
            Err(PageEventError::Unauthorized)
        }
    } else {
        Err(PageEventError::NotFound)
    }
}

pub async fn add_post_to_page(params: PageAddPostParams) -> Result<PageEvent, PageEventError> {
    if let Some(page) = find_page_by_id(&params.page_id) {
        if page.owner == params.owner_id {
            page.posts.push(params.post_id.clone());
            Ok(PageEvent::AddedPost(params.post_id))
        } else {
            Err(PageEventError::Unauthorized)
        }
    } else {
        Err(PageEventError::NotFound)
    }
}

pub async fn delete_post_from_page(
    params: PageDeletePostParams,
) -> Result<PageEvent, PageEventError> {
    if let Some(page) = find_page_by_id(&params.page_id) {
        if page.owner == params.owner_id {
            page.posts.retain(|post| post != &params.post_id);
            Ok(PageEvent::DeletedPost(params.post_id))
        } else {
            Err(PageEventError::Unauthorized)
        }
    } else {
        Err(PageEventError::NotFound)
    }
}

pub async fn add_event_to_page(
    params: PageAddPageEventParams,
) -> Result<PageEvent, PageEventError> {
    if let Some(page) = find_page_by_id(&params.page_id) {
        if page.owner == params.owner_id {
            page.events.push(params.event_id.clone());
            Ok(PageEvent::AddedPageEvent(params.event_id))
        } else {
            Err(PageEventError::Unauthorized)
        }
    } else {
        Err(PageEventError::NotFound)
    }
}

pub async fn delete_event_from_page(
    params: PageDeletePageEventParams,
) -> Result<PageEvent, PageEventError> {
    if let Some(page) = find_page_by_id(&params.page_id) {
        if page.owner == params.owner_id {
            page.events.retain(|event| event != &params.event_id);
            Ok(PageEvent::DeletedPageEvent(params.event_id))
        } else {
            Err(PageEventError::Unauthorized)
        }
    } else {
        Err(PageEventError::NotFound)
    }
}

pub async fn add_user_to_page(params: PageAddUserParams) -> Result<PageEvent, PageEventError> {
    if let Some(page) = find_page_by_id(&params.page_id) {
        if page.owner == params.owner_id {
            page.members.push(params.user_id);
            Ok(PageEvent::AddedUser(params.page_id))
        } else {
            Err(PageEventError::Unauthorized)
        }
    } else {
        Err(PageEventError::NotFound)
    }
}

pub async fn delete_user_from_page(
    params: PageDeleteUserParams,
) -> Result<PageEvent, PageEventError> {
    if let Some(page) = find_page_by_id(&params.page_id) {
        if page.owner == params.owner_id {
            page.members.retain(|user| *user != params.user_id);
            Ok(PageEvent::DeletedUser(params.page_id))
        } else {
            Err(PageEventError::Unauthorized)
        }
    } else {
        Err(PageEventError::NotFound)
    }
}

// -------------------------------------------------------

pub fn get_all_pages() -> PageStateEvent {
    let pages: Vec<Page> = unsafe { PAGES.iter().cloned().collect() };
    PageStateEvent::GetAllPages(pages)
}

fn get_page_by_id(page_id: CommonAddressId) -> PageStateEvent {
    let page = unsafe { PAGES.iter().find(|page| page.id == page_id).cloned() };
    match page {
        Some(page) => PageStateEvent::GetPageById(Some(page)),
        None => PageStateEvent::GetPageById(None),
    }
} 

pub fn get_all_page_usernames() -> PageStateEvent {
    let usernames: Vec<String> =
        unsafe { PAGES.iter().map(|page| page.username.clone()).collect() };
    PageStateEvent::GetAllPageUsernames(usernames)
}

pub fn handle_page_state(page_state_action: PageStateAction) -> PageStateEvent {
    match page_state_action {
        PageStateAction::GetAllPages => get_all_pages(),
        PageStateAction::GetPageById(page_id) => get_page_by_id(page_id),
        PageStateAction::GetAllPageUsernames => get_all_page_usernames(),
    }
}

pub async fn handle_page_action(page_action: PageAction) -> Result<PageEvent, PageEventError> {
    debug!("page_action: {:?}", page_action);

    match page_action {
        PageAction::Create(params) => create_page(params).await,
        PageAction::Join(params) => join_page(params).await,
        PageAction::Delete(params) => delete_page(params).await,
        PageAction::AddArticle(params) => add_article_to_page(params).await,
        PageAction::DeleteArticle(params) => delete_article_from_page(params).await,
        PageAction::AddPost(params) => add_post_to_page(params).await,
        PageAction::DeletePost(params) => delete_post_from_page(params).await,
        PageAction::AddPageEvent(params) => add_event_to_page(params).await,
        PageAction::DeletePageEvent(params) => delete_event_from_page(params).await,
        PageAction::AddUser(params) => add_user_to_page(params).await,
        PageAction::DeleteUser(params) => delete_user_from_page(params).await,
    }
}
