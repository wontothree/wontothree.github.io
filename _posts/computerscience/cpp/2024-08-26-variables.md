---
title: "[C++] Memer Variable"
categories:
  - cpp
---
- Global Variable
- Member Variable
- Local Variable

#

```cpp
std::vector<grid_map::Index> LocalCostmapGenerator::pointcloud_to_costmap(const pcl::PointCloud<PointType>::ConstPtr& preprocessed_pcl_ptr,
                                                                          grid_map::GridMap* cost_map) const

{
    grid_map::Matrix& cost_map_data = cost_map->get(collision_layer_name_);
    // costmap clear
    cost_map_data.setZero();
    std::vector<grid_map::Index> occupied_indices(preprocessed_pcl_ptr->points.size());

#pragma omp parallel for num_threads(thread_num_)
    for (unsigned int i = 0; i < preprocessed_pcl_ptr->points.size(); ++i) {
        const auto& point = preprocessed_pcl_ptr->points[i];
        if (cost_map->isInside(grid_map::Position(point.x, point.y))) {
            grid_map::Index index;
            cost_map->getIndex(grid_map::Position(point.x, point.y), index);
            cost_map_data(index.x(), index.y()) = max_val_;
            occupied_indices[i] = index;
        } else {
            occupied_indices[i] = grid_map::Index(-1, -1);
        }
    }

    // remove index (-1, -1) which means outside of costmap
    occupied_indices.erase(std::remove_if(occupied_indices.begin(), occupied_indices.end(),
                                          [](const grid_map::Index& index) { return index.x() == -1 && index.y() == -1; }),
                           occupied_indices.end());

    return occupied_indices;
}
```

함수의 선언에서 마지막에 const가 붙으면, 해당 멤버 함수가 클래스의 멤버 변수를 수정하지 않는다는 것을 보장한다.

const의 장점

- 객체 상태 보호 : 함수가 클래스의 멤버 변수를 변경하지 않도록 하여 의도치 않은 부작용을 방지한다. 이는 특히 멀티스레드 환경에서 중요한데, 함수가 객체의 상태를 변경하지 않으면 동기화 문제를 줄일 수 있다.