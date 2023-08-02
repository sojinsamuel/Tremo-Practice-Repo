import { gql } from "@apollo/client";

const fetchWeatherQuery = gql`
  query MyQuery(
    $current_weather: String
    $daily: String = "weathercode,temperature_2m_max"
    $hourly: String = "temperature_2m,relativehumidity_2m,precipitation_probability,apparent_temperature,dewpoint_2m,uv_index,uv_index_clear_sky"
    $latitude: String!
    $longitude: String!
    $timezone: String!
  ) {
    myQuery(
      current_weather: $current_weather
      daily: $daily
      hourly: $hourly
      latitude: $latitude
      longitude: $longitude
      timezone: $timezone
    ) {
      current_weather {
        is_day
        windspeed
        weathercode
        temperature
        time
        winddirection
      }
      daily {
        temperature_2m_max
        time
        weathercode
      }
      daily_units {
        temperature_2m_max
        time
        weathercode
      }
      elevation
      generationtime_ms
      hourly {
        apparent_temperature
        uv_index_clear_sky
        uv_index
        time
        temperature_2m
        relativehumidity_2m
        precipitation_probability
        dewpoint_2m
      }
      hourly_units {
        apparent_temperature
        dewpoint_2m
        precipitation_probability
        relativehumidity_2m
        temperature_2m
        time
        uv_index
        uv_index_clear_sky
      }
      latitude
      longitude
      timezone
      timezone_abbreviation
      utc_offset_seconds
    }
  }
`;

export default fetchWeatherQuery;
