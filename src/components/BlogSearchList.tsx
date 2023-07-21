import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Chip,
  Typography,
  Avatar,
  Box,
  Container,
  useTheme,
} from "@mui/material";
import { CardActionArea } from "@mui/material";
import SearchBarAligned from "./search-bar/SearchBarAligned";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";

export default function BlogSearchList() {
  const API_URL = "http://localhost:3000";
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams([["index", "blog"]]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);

  const navigate = useNavigate();

  const handleSearchTerm = async (event: any) => {
    setSearchTerm(event.target.value);
    if (event.keyCode === 13) {
      if (!searchTerm) {
        return navigate("/");
      }
      window.location.href = `/search?title=${searchTerm}`;
      // navigate({
      //   pathname: "/search",
      //   search: `?title=${searchTerm}`,
      // });
    }
  };

  const fetchResults = async (searchTerm: any) => {
    const config = {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application.json",
      },
    };
    console.log(searchTerm, searchParams.get("title"));
    let result: any = await fetch(
      `${API_URL}/search?title=${searchTerm}`,
      config
    );
    result = await result.json();
    if (result.data.hits.hits.length === 0) {
      navigate("/");
    }
    setSearchResults(result.data.hits.hits);
  };

  useEffect(() => {
    const title = searchParams.get("title") || "";
    setSearchTerm(title);
    if (!title) {
      return navigate("/");
    }

    (async () => {
      await fetchResults(title);
    })();
  }, []);

  return (
    <Container>
      <SearchBarAligned
        searchTerm={searchTerm}
        handleSearchTerm={handleSearchTerm}
      />
      {searchResults.map((item: any) => {
        return (
          <Link to={`/blog/view/${item._source.id}`}>
            <Card
              key={item._id}
              sx={{
                maxWidth: "53%",
                [theme.breakpoints.down("sm")]: {
                  maxWidth: "100%",
                },
                marginBottom: "10px",
              }}
            >
              <CardActionArea>
                <CardContent>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    {!item._source._tags &&
                      item._source.tags?.map((tagItem: any) => (
                        <Chip label={tagItem} size="small" variant="outlined" />
                      ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ flex: 3 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {item._source.title}
                      </Typography>
                      {item._source.meta_description && (
                        <Typography variant="body2" color="text.secondary">
                          {item._source.meta_description}
                        </Typography>
                      )}
                    </div>
                    <img
                      style={{ flex: 1, borderRadius: "3%", height: "100px" }}
                      src="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                      alt="green iguana"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "15px",
                      justifyContent: "space-between",
                      alignItems: "end",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <div>
                        <Avatar
                          src={"https://i.pravatar.cc/300?img=13"}
                          style={{ marginRight: "7px" }}
                        />
                      </div>
                      <div>
                        <Box sx={{ typography: "subtitle2" }}>
                          {item._source.author_name
                            ? item._source.author_name
                            : "Annonymous"}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {moment(item._source.created_at).format(
                            "MMM DD YYYY"
                          )}
                        </Typography>
                      </div>
                    </div>
                    <div>
                      <Typography variant="body2" color="text.secondary">
                        Like: 123
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        );
      })}
    </Container>
  );
}
