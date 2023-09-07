import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { PageWrap } from '@edx/frontend-platform/react';
import Placeholder from '@edx/frontend-lib-content-components';
import CourseAuthoringPage from './CourseAuthoringPage';
import { PagesAndResources } from './pages-and-resources';
import ProctoredExamSettings from './proctored-exam-settings/ProctoredExamSettings';
import EditorContainer from './editors/EditorContainer';
import VideoSelectorContainer from './selectors/VideoSelectorContainer';
import CustomPages from './custom-pages';
import FilesAndUploads from './files-and-uploads';
import { AdvancedSettings } from './advanced-settings';
import ScheduleAndDetails from './schedule-and-details';
import { GradingSettings } from './grading-settings';
import CourseTeam from './course-team/CourseTeam';
import { CourseUpdates } from './course-updates';

/**
 * As of this writing, these routes are mounted at a path prefixed with the following:
 *
 * /course/:courseId
 *
 * Meaning that their absolute paths look like:
 *
 * /course/:courseId/course-pages
 * /course/:courseId/proctored-exam-settings
 * /course/:courseId/editor/:blockType/:blockId
 *
 * This component and CourseAuthoringPage should maybe be combined once we no longer need to have
 * CourseAuthoringPage split out for use in LegacyProctoringRoute.  Once that route is removed, we
 * can move the Header/Footer rendering to this component and likely pull the course detail loading
 * in as well, and it'd feel a bit better-factored and the roles would feel more clear.
 */
const CourseAuthoringRoutes = () => {
  const { courseId } = useParams();

  return (
    <CourseAuthoringPage courseId={courseId}>
      <Routes>
        <Route
          path="outline"
          element={process.env.ENABLE_NEW_COURSE_OUTLINE_PAGE === 'true' ? <PageWrap><Placeholder /></PageWrap> : null}
        />
        <Route
          path="course_info"
          element={<CourseUpdates courseId={courseId} />}
        />
        <Route
          path="assets"
          element={<FilesAndUploads courseId={courseId} />}
        />
        <Route
          path="videos"
          element={process.env.ENABLE_NEW_VIDEO_UPLOAD_PAGE === 'true' ? <PageWrap><Placeholder /></PageWrap> : null}
        />
        <Route
          path="pages-and-resources/*"
          element={<PageWrap><PagesAndResources courseId={courseId} /></PageWrap>}
        />
        <Route
          path="proctored-exam-settings"
          element={<PageWrap><ProctoredExamSettings courseId={courseId} /></PageWrap>}
        />
        <Route
          path="custom_pages/*"
          element={<CustomPages courseId={courseId} />}
        />
        <Route
          path="/container/:blockId"
          element={process.env.ENABLE_UNIT_PAGE === 'true' ? <PageWrap><Placeholder /></PageWrap> : null}
        />
        <Route
          path="editor/course-videos/:blockId"
          element={process.env.ENABLE_NEW_EDITOR_PAGES === 'true' ? <PageWrap><VideoSelectorContainer courseId={courseId} /></PageWrap> : null}
        />
        <Route
          path="editor/:blockType/:blockId?"
          element={process.env.ENABLE_NEW_EDITOR_PAGES === 'true' ? <PageWrap><EditorContainer courseId={courseId} /></PageWrap> : null}
        />
        <Route
          path="settings/details"
          element={<ScheduleAndDetails courseId={courseId} />}
        />
        <Route
          path="settings/grading"
          element={<GradingSettings courseId={courseId} />}
        />
        <Route
          path="course_team"
          element={<CourseTeam courseId={courseId} />}
        />
        <Route
          path="settings/advanced"
          element={<AdvancedSettings courseId={courseId} />}
        />
        <Route
          path="import"
          element={process.env.ENABLE_NEW_IMPORT_PAGE === 'true' ? <PageWrap><Placeholder /></PageWrap> : null}
        />
        <Route
          path="export"
          element={process.env.ENABLE_NEW_EXPORT_PAGE === 'true' ? <PageWrap><Placeholder /></PageWrap> : null}
        />
      </Routes>
    </CourseAuthoringPage>
  );
};

export default CourseAuthoringRoutes;
