package com.ninaorganization.repository;

import com.ninaorganization.entity.Internship;
import com.ninaorganization.entity.enums.InternshipLevel;
import com.ninaorganization.entity.enums.WorkMode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InternshipRepository extends JpaRepository<Internship, Long> {
    Page<Internship> findByActiveTrue(Pageable pageable);

    @Query("SELECT DISTINCT i.domain FROM Internship i WHERE i.active = true AND i.domain IS NOT NULL ORDER BY i.domain")
    List<String> findDistinctDomains();

    @Query("SELECT DISTINCT i.category FROM Internship i WHERE i.active = true AND i.category IS NOT NULL ORDER BY i.category")
    List<String> findDistinctCategories();

    @Query("SELECT i FROM Internship i WHERE i.active = true AND " +
           "(:domain IS NULL OR i.domain = :domain) AND " +
           "(:category IS NULL OR i.category = :category) AND " +
           "(:workMode IS NULL OR i.workMode = :workMode) AND " +
           "(:level IS NULL OR i.level = :level) AND " +
           "(:featured IS NULL OR i.featured = :featured) AND " +
           "(:liveProject IS NULL OR i.liveProject = :liveProject) AND " +
           "(:ppo IS NULL OR i.ppoAvailable = :ppo) AND " +
           "(:search IS NULL OR LOWER(i.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(i.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Internship> search(@Param("domain") String domain, @Param("category") String category,
                            @Param("workMode") WorkMode workMode, @Param("level") InternshipLevel level,
                            @Param("featured") Boolean featured, @Param("liveProject") Boolean liveProject,
                            @Param("ppo") Boolean ppo, @Param("search") String search, Pageable pageable);
}
