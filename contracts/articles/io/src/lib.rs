#![no_std]

use deconnect_pages_io::{CommonAddressId, PageStatus, PageVisibility};
use deconnect_users_io::UserId;
use gmeta::{InOut, Metadata};
use gstd::{debug, errors::Result, msg, prelude::*, Vec};

pub struct DeConnectArticlesMetadata;

pub static mut ARTICLES: Vec<Article> = Vec::new();

impl Metadata for DeConnectArticlesMetadata {
    type Init = ();
    type Handle = InOut<ArticleActions, Result<ArticleEvents, ArticleEventError>>;
    type State = InOut<ArticleStateActions, ArticleStateEvents>;
    type Reply = ();
    type Others = ();
    type Signal = ();
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct Article {
    id: CommonAddressId,
    title: String,
    owner: UserId,
    created_by: UserId,
    transferred_by: Option<UserId>,
    slug: String,
    tags: Vec<String>,
    cover: String,
    category: String,
    caption: Option<String>,
    audio_url: Option<String>,
    published_on: String,
    keywords: Vec<String>,
    is_transferred: bool,
    status: PageStatus,
    created_at: String,
    updated_at: String,
    description: String,
    lang: String,
    license: String,
    license_content: String,
    latest_published_date: String,
    other_publications: Vec<String>,
    hide_comments: bool,
    contributors: Vec<UserId>,
    visibility: PageVisibility,
    content: String,
    is_chat_enabled: bool,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum ArticleEventError {
    Unauthorized,
    NotFound,
    PaymentRequired,
    IncorrectAmount,
    Unknown(String),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum ArticleActions {
    Create(CreateArticleParams),
    // Delete(ArticleDeleteParams),
    // Update(ArticleAddArticleParams),
    // Transfer(CommonAddressId),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum ArticleEvents {
    Created(CommonAddressId),
    // Deleted(CommonAddressId),
    // Updated(CommonAddressId),
    // Transferred(CommonAddressId),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum ArticleStateActions {
    GetAllArticles,
    GetArticleById(CommonAddressId),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum ArticleStateEvents {
    GetAllArticles(Vec<Article>),
    GetArticleById(Option<Article>),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct CreateArticleParams {
    title: String,
    owner: UserId,
    created_by: UserId,
    transferred_by: Option<UserId>,
    slug: String,
    tags: Vec<String>,
    image: String,
    cover: String,
    category: String,
    caption: Option<String>,
    audio_url: Option<String>,
    published_on: String,
    keywords: Vec<String>,
    is_transferred: bool,
    status: PageStatus,
    created_at: String,
    updated_at: String,
    description: String,
    lang: String,
    license: String,
    license_content: String,
    latest_published_date: String,
    other_publications: Vec<String>,
    hide_comments: bool,
    contributors: Vec<UserId>,
    visibility: PageVisibility,
    content: String,
    is_chat_enabled: bool,
}

pub async fn create_article(
    params: CreateArticleParams,
) -> Result<ArticleEvents, ArticleEventError> {
    // Helper function to validate non-empty mandatory fields
    fn validate_mandatory_field(field: &str, field_name: &str) -> Result<(), ArticleEventError> {
        if field.is_empty() {
            return Err(ArticleEventError::Unknown(format!(
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
    ) -> Result<(), ArticleEventError> {
        if let Some(ref field_value) = field {
            if field_value.is_empty() {
                return Err(ArticleEventError::Unknown(format!(
                    "{} cannot be empty",
                    field_name
                )));
            }
        }
        Ok(())
    }

    // Validate mandatory fields
    validate_mandatory_field(&params.title, "Title")?;
    validate_mandatory_field(&params.slug, "Slug")?;
    validate_mandatory_field(&params.description, "Description")?;
    validate_mandatory_field(&params.content, "Content")?;
    validate_mandatory_field(&params.category, "Category")?;
    validate_mandatory_field(&params.created_at, "Created at date")?;
    validate_mandatory_field(&params.updated_at, "Updated at date")?;

    // Validate optional fields
    // validate_optional_field(&params.profile, "Profile")?;
    // validate_optional_field(&params.cover, "Cover")?;
    // validate_optional_field(&params.contact_email, "Contact email")?;
    // validate_optional_field(&params.website, "Website")?;
    // validate_optional_field(&params.page_rules, "Page rules")?;
    // validate_optional_field(&params.readme, "Readme")?;

    let article_id = msg::id();

    // // Check for uniqueness of username
    // unsafe {
    //     if ARTICLES.iter().any(|article| article.username == params.username) {
    //         return Err(ArticleEventError::Unknown("Username already exists".into()));
    //     }
    // }

    // Create the page
    let article = Article {
        id: article_id,
        owner: params.owner.clone(),
        created_by: params.created_by.clone(),
        title: params.title.clone(),
        slug: params.slug.clone(),
        description: params.description.clone(),
        content: params.content.clone(),
        category: params.category.clone(),
        keywords: params.keywords.clone(),
        tags: params.tags.clone(),
        cover: params.cover.clone(),
        license: params.license.clone(),
        created_at: params.created_at,
        updated_at: params.updated_at,
        status: params.status,
        visibility: params.visibility,
        transferred_by: None, // remove
        caption: Some(params.caption.clone().expect("Something went wrong")),
        audio_url: Some(params.audio_url.clone().expect("Something went wrong")),
        published_on: params.published_on.clone(),
        is_transferred: false, // Default
        lang: params.lang.clone(),
        license_content: params.license_content.clone(),
        latest_published_date: params.latest_published_date.clone(),
        other_publications: params.other_publications.clone(),
        hide_comments: params.hide_comments.clone(),
        contributors: params.contributors.clone(),
        is_chat_enabled: params.is_chat_enabled.clone(),
    };

    // Add the page to the list
    unsafe {
        ARTICLES.push(article);
    }

    Ok(ArticleEvents::Created(article_id))
}

pub fn get_all_articles() -> ArticleStateEvents {
    let articles = unsafe { ARTICLES.iter().cloned().collect() };
    ArticleStateEvents::GetAllArticles(articles)
}

pub fn handle_article_state(article_state_action: ArticleStateActions) -> ArticleStateEvents {
    match article_state_action {
        ArticleStateActions::GetAllArticles => get_all_articles(),
        ArticleStateActions::GetArticleById(_) => todo!(),
    }
}

pub async fn handle_article_action(
    article_action: ArticleActions,
) -> Result<ArticleEvents, ArticleEventError> {
    debug!("article_action: {:?}", article_action);

    match article_action {
        ArticleActions::Create(params) => create_article(params).await,
    }
}
