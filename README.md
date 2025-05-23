# Translation App - Design and Implementation Explanations

## Front-end Architecture

The translation app uses Next.js with a modular component architecture following a clear separation of concerns:

1. **Page Components**: Define the main application routes and integrate various UI components
   - Dashboard page - displays project list
   - Project page - handles translation management for a specific project
   - Landing page - introduces the app to new users

2. **UI Components**: Modular, reusable interface elements leveraging shadcn/ui
   - Translation table - core component for displaying and editing translations
   - Import/Export functionality - handles file operations
   - Project management - cards and dialogs for project creation/editing

3. **State Management**: Uses React's built-in state management with a parent-child component structure
   - State is lifted to the highest necessary component for sharing
   - Prop drilling is minimized by thoughtful component organization
   - Avoids unnecessary complexity by not introducing Redux or Context API prematurely

## Back-end Architecture

The app uses Next.js API routes for backend functionality:

1. **API Organization**: API routes follow RESTful design principles
   - Projects endpoint - CRUD operations for translation projects
   - Translations endpoint - manages translation entries
   - Import/Export endpoints - handles file processing

2. **Database Integration**: Supabase provides PostgreSQL database access
   - API routes connect to Supabase for data persistence
   - Client-side connection is established for real-time subscriptions

3. **Authentication**: Leverages Supabase Auth for user management
   - Secure endpoints with proper authorization checks
   - Row-level security policies in the database

## Data Model

The database schema is designed for flexibility and efficiency:

1. **Projects Table**:
   ```
   id: uuid (PK)
   name: text
   description: text
   created_at: timestamptz
   updated_at: timestamptz
   user_id: uuid (FK)
   ```

2. **Languages Table**:
   ```
   id_lng: text (PK, e.g., "en-US")
   name: text (e.g., "English (US)")
   project_id: uuid (FK)
   ```

3. **Translations Table**:
   ```
   id: uuid (PK)
   project_id: uuid (FK)
   key: text (translation key with dot notation)
   created_at: timestamptz
   updated_at: timestamptz
   ```

4. **TranslationValues Table**:
   ```
   id: uuid (PK)
   translation_id: uuid (FK)
   language_id: text (FK)
   value: text
   created_at: timestamptz
   updated_at: timestamptz
   ```

This schema supports:
- Hierarchy in translation keys through dot notation
- Multiple languages per project
- Version tracking through timestamps
- Efficient querying for specific translation sets

